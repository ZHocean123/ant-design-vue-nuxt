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
          resolve:{
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
            ]
          }
        }
      }
    })
  }
}
