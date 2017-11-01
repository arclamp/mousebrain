if (!window.__mousebrain_config) {
  require.config({
    paths: {
      mousebrain: '/files/build/mousebrain'
    }
  });

  window.__mousebrain_config = true;
}
