from IPython.display import display
from IPython.display import publish_display_data
import json
import os
from pandas import DataFrame
import uuid
import logging

curdir = os.path.dirname(os.path.join(os.path.abspath(os.getcwd()), __file__))

def load_js(filename):
    with open(os.path.join(curdir, 'js', filename)) as f:
        text = f.read()
    return text

try:
    __IPYTHON__
except NameError:
    raise ImportError('mousebrain must be imported from IPython')

_require_config = load_js('require_config.js')

_mb_constructor_raw = load_js('mb_constructor.js')
def _mb_constructor(which, options):
    return _mb_constructor_raw % (which, json.dumps(options, cls=DataFrameEncoder))

_mb_render_raw = load_js('mb_render.js')
def _mb_render(which):
    js = _mb_render_raw % (which)
    return js

_mb_set_drilldown_raw = load_js('mb_set_drilldown.js')
def _mb_set_drilldown(which, drilldown):
    return _mb_set_drilldown_raw % (which, drilldown)

class DataFrameEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, DataFrame):
            return obj.to_dict(orient='records')
        return json.JSONEncoder.default(self, obj)

class Mousebrain(object):
    def __init__(self, **kwargs):
        self.id = str(uuid.uuid4())
        self.options = kwargs

        publish_display_data({'application/javascript': _mb_constructor(self.id, self.options)})

    def render(self):
        publish_display_data({'application/javascript': _mb_render(self.id)})

    def set_drilldown(self, drilldown):
        publish_display_data({'application/javascript': _mb_set_drilldown(self.id, drilldown)})

    def _ipython_display_(self):
        self.render();

    def display(self):
        display(self)

publish_display_data({'application/javascript': _require_config})
