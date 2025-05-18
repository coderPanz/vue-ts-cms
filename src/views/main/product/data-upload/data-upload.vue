<template>
  <div class="data-upload-container">
    <el-card class="box-card" v-for="(module, index) in reportModules" :key="module.id">
      <template #header>
        <div class="card-header">
          <span>{{ module.title }}</span>
          <el-button class="button" type="primary" @click="submitData(module.id, module.form)"
            >上报数据</el-button
          >
        </div>
      </template>
      <el-form :model="module.form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="模块标题">
              <el-input v-model="module.form.title" placeholder="请输入模块标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="具体数据">
              <el-input-number
                v-model="module.form.number1"
                :min="0"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="文案">
              <el-input v-model="module.form.tips" placeholder="请输入文字提示"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>全国销量数据模块</span>
          <el-button class="button" type="primary" @click="submitCityData">上报数据</el-button>
        </div>
      </template>
      <el-form :model="cityForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="选择城市">
              <el-select v-model="cityForm.city" placeholder="请选择城市">
                <el-option
                  v-for="city in cities"
                  :key="city"
                  :label="city"
                  :value="city"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销量">
              <el-input-number
                v-model="cityForm.count"
                :min="0"
                controls-position="right"
                placeholder="请输入销量"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { goodsDataUploadReq, goodsCountListReq, goodsSaleCountryUploadReq } from '@/server/main/product'
import { onMounted } from 'vue'

interface ReportModuleData {
  title: string
  tips: string
  subTitle: string
  number1: number | null
}

interface ReportModule {
  id: string
  title: string
  form: ReportModuleData
}

onMounted(() => {
  goodsCountListReq().then((res) => {
    if (res.data.status === 200) {
      // 使用循环优化数据赋值逻辑
      res.data.data.forEach((item: any, index: number) => {
        if (index < reportModules.length) {
          reportModules[index].form.title = item.title
          reportModules[index].form.number1 = item.number1
          reportModules[index].form.tips = item.tips
        }
      })
    }
  })
})
const reportModules = reactive<ReportModule[]>([
  {
    id: '64bcd096175ffc9690c14d56',
    title: '总销量模块',
    form: {
      title: '',
      tips: '',
      subTitle: '',
      number1: null
    }
  },
  {
    id: '64bcd096175ffc9690c14d57',
    title: '总收藏量模块',
    form: {
      title: '',
      tips: '',
      subTitle: '',
      number1: null
    }
  },
  {
    id: '64bcd096175ffc9690c14d58',
    title: '活动销量模块',
    form: {
      title: '',
      tips: '',
      subTitle: '',
      number1: null
    }
  },
  {
    id: '64bcd096175ffc9690c14d59',
    title: '总库存模块',
    form: {
      title: '',
      tips: '',
      subTitle: '',
      number1: null
    }
  }
])

const submitData = (id: string, data: ReportModuleData) => {
  goodsDataUploadReq(id, {
    title: data.title,
    tips: data.tips,
    number1: data.number1
  }).then((res) => {
    if (res.data.status === 200) {
      ElMessage.success('数据上报成功!')
      goodsCountListReq().then((res) => {
        if (res.data.status === 200) {
          // 使用循环优化数据赋值逻辑
          res.data.data.forEach((item: any, index: number) => {
            if (index < reportModules.length) {
              reportModules[index].form.title = item.title
              reportModules[index].form.number1 = item.number1
              reportModules[index].form.tips = item.tips
            }
          })
        }
      })
    } else {
      ElMessage.error('数据上报失败:' + res.data.message)
    }
  })
}

interface CityForm {
  city: string
  count: number | null
}

const cities = [
  '上海',
  '北京',
  '广州',
  '深圳',
  '成都',
  '天津',
  '沈阳',
  '吉林',
  '苏州',
  '南京',
  '武汉',
  '贵阳',
  '重庆'
]

const cityForm = reactive<CityForm>({
  city: '',
  count: null
})

const submitCityData = () => {
  if (!cityForm.city || !cityForm.count) {
    ElMessage.warning('请填写完整的城市销量数据')
    return
  }
  // TODO: 实现城市销量数据上报接口
  goodsSaleCountryUploadReq(cityForm).then((res) => {
    if (res.data.status === 200) {
      ElMessage.success('城市销量数据上报成功！')
      cityForm.city = ''
      cityForm.count = null
    } else {
      ElMessage.error('城市销量数据上报失败：' + res.data.message)
    }
  })
}
</script>

<style scoped>
.data-upload-container {
  padding: 20px;
}

.box-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-form-item {
  margin-bottom: 18px; /* 增加表单项间距 */
}

.el-input-number {
  width: 100%;
}
</style>
