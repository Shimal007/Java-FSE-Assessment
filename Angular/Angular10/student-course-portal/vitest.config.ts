import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    {
      name: 'fix-angular-vitest-parenthesis',
      enforce: 'post',
      configResolved(config) {
        // Escape parentheses in absolute paths passed by Angular builder
        // so that Vitest's fast-glob doesn't treat them as regex groups.
        if (config.test && config.test.include) {
           config.test.include = config.test.include.map(p => 
             typeof p === 'string' ? p.replace(/\)/g, '\\)') : p
           );
        }
        
        // Also check projects array just in case
        if (config.test && config.test.projects) {
          config.test.projects.forEach(proj => {
            if (proj.test && proj.test.include) {
              proj.test.include = proj.test.include.map(p => 
                typeof p === 'string' ? p.replace(/\)/g, '\\)') : p
              );
            }
          });
        }
      }
    }
  ]
});
