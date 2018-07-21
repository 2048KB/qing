export function setBtnLoading(text = '加载中...') {
  this.btnLoading = true
  this.commitBtnText = text || '加载中...'
}

export function resetBtnLoading(code = 0, msg, text = '确 定') {
  this.btnLoading = false
  this.commitBtnText = text || '确 定'

  if (+code < 0) {
    this.$message({
      message: msg || '服务异常，请稍后再试！',
      type: 'error'
    })
  } else {
    this.$message({
      message: msg || '成功',
      type: 'success'
    })
  }
}
