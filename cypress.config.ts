import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {},
  viewportHeight: 900,
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack'
    }
  }
});
