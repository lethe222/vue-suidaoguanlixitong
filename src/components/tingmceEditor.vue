<script setup>
import tinymce from 'tinymce/tinymce' // 核心包，必须先导入
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default'
import 'tinymce/models/dom' // 旧版本的 DOM 修复

// 常用插件按需引入；更多参考 https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/image'
import 'tinymce/plugins/importcss'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/code'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/link'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/template'
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/insertdatetime'
import { ref, reactive, watch } from 'vue'

// 先定义 props，再在 init 中使用
const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  options: {
    type: Object, // 期望接收的类型是对象
    default: () => {}, // 默认值是空对象
  },
  plugins: {
    type: [String, Array],
    default: 'lists image media table wordcount save preview', // 启用的插件：列表/图片/媒体/表格/字数统计/保存/预览
  },
  toolbar: {
    type: [String, Array],
    // toolbar 语法：用 | 分组
    // undo redo                       撤销/重做
    // formatselect                    段落/标题选择
    // bold italic underline           粗体/斜体/下划线
    // strikethrough                   删除线
    // forecolor backcolor             字体颜色/背景色
    // alignleft/center/right/justify  左/中/右/两端对齐
    // bullist numlist                 无序/有序列表
    // outdent indent                  减小/增大缩进
    // blockquote                      引用
    // lists image media table         列表、插图、媒体、表格按钮
    // codesample code                 代码块、源码查看
    // removeformat                    清除格式
    // save preview                    保存、预览
    default:
      'undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent blockquote | lists image media table | codesample code removeformat save preview',
  },
})

const emit = defineEmits(['onDataEvent'])
const textContent = ref(props.value)
const init = reactive({
  width: props.options.width,
  height: props.options.height,
  language_url: '/tinymce/langs/zh-Hans.js',
  language: 'zh-Hans',
  skin_url: '/tinymce/skins/ui/oxide',
  plugins: props.plugins,
  toolbar: props.toolbar,
  content_css: '/tinymce/skins/content/default/content.css',
  branding: false,
  menubar: false, // 隐藏菜单栏
  statusbar: true, // 显示底部状态栏
  init_instance_callback: (editor) => {
    console.log('初始化完成：', editor)
  },
  // 简单的 base64 直传示例；生产环境建议改成自定义上传接口
  images_upload_handler: (blobInfo, success, failure) => {
    try {
      const img = `data:${blobInfo.blob().type};base64,${blobInfo.base64()}`
      success(img)
    } catch (err) {
      failure(err?.message || '上传失败')
    }
  },
})

// 同步外部 value 变更
watch(
  () => props.value,
  (val) => {
    if (val !== textContent.value) textContent.value = val
  },
)

// 向父组件派发内容变化
watch(textContent, (val) => {
  emit('onDataEvent', val)
})
</script>

<template>
  <div>
    <editor v-model="textContent" :init="init"></editor>
  </div>
</template>

<style scoped></style>
