from IPython.display import display
from IPython.display import publish_display_data
import json
import os

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
_init_js = load_js('init.js')

_mousebrain_display_raw = load_js('mousebrain_display.js')
def _mousebrain_display(options):
    return _mousebrain_display_raw % (json.dumps(options))

def init():
    publish_display_data({'application/javascript': _require_config + _init_js})

class Mousebrain(object):
    def __init__(self, **kwargs):
        self.options = kwargs

    def _ipython_display_(self):
        publish_display_data({'application/javascript': _mousebrain_display(self.options)})

    def display(self):
        display(self)

init()
