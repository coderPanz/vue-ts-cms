export const validationRules = {
  name: [
    { required: true, message: '请输入', trigger: 'blur' },
    { min: 3, max: 12, message: '用户名长度为3到12位', trigger: 'blur' }
  ],
  leader: [
    { required: true, message: '请输入', trigger: 'blur' },
    { min: 3, max: 12, message: '用户名长度为3到12位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d).{3,12}$/,
      message: '密码长度为3到12位且必须含有数字和字母',
      trigger: 'blur'
    }
  ]
}