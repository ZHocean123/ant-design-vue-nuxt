import { useNuxt } from '@nuxt/kit'
import { libraryName } from '../config'

export function resolveOptions () {
  const nuxt = useNuxt()

  nuxt.options.build.transpile.push(libraryName)

  if(nuxt.options.builder === '@nuxt/vite-builder'){
    // Vite specific options
    nuxt.options.vite.plugins ??= []
    nuxt.options.vite.plugins.push({
      name:"antd-dayjs",
      config(){
        return {
          resolve: {
            alias:[ 
               {
                find: /^(ant-design-vue)(?!\/(es|dist))/,
                replacement: 'ant-design-vue/es',
              },
              {
                find: /^ant-design-vue\/dist$/,
                replacement: 'ant-design-vue/dist',
              },
              {
                find: /^ant-design-vue\/es$/,
                replacement: 'ant-design-vue/es',
              },
              {
                find: /^@ant-design\/icons-vue$/,
                replacement: '@ant-design/icons-vue',
              },   
              {
                find: /^dayjs(\/.*)?/,
                replacement: 'dayjs$1',
                async customResolver(source, importer, options) {
                  let resolvedPath = "";
                  // check if the import happens inside the package directory
                  if (importer &&  /ant-design-vue[\\/]es/.test(importer)) {
                    resolvedPath = source.replace(/^dayjs/, 'dayjs/esm');
                  } else {
                    resolvedPath = source;
                  }
                  // use Vite's (in fact, rollup's) resolution function
                  return (await this.resolve(resolvedPath))?.id;
                },
              },
            ]
          }
        }
      }
    })
  }
}
