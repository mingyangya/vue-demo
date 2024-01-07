<template>
  <div class="custom-table px-10 overflow-auto h-full">
    <div class="mb-3">
      <el-button type="primary" @click="handleExport">导出</el-button>
      <el-button type="primary" @click="handleExport2">导出2</el-button>
    </div>

    <el-table :data="tableData" style="width: 'auto'" ref="refTable" :fit="true" :show-summary="showSummary"
      :summary-method="getSummaries1">
      <el-table-column type="expand"></el-table-column>
      <el-table-column type="index" width="50" label="序号">
      </el-table-column>
      <el-table-column prop="date" label="日期" min-width="150">
      </el-table-column>
      <el-table-column label="配送信息">
        <el-table-column prop="name" label="姓名" min-width="120">
        </el-table-column>
        <el-table-column label="地址">
          <el-table-column prop="province" label="省份" min-width="120">
          </el-table-column>
          <el-table-column prop="city" label="市区" min-width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" min-width="300">
          </el-table-column>
          <el-table-column prop="zip" label="邮编" min-width="120">
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>


    <el-table :data="tableData2" style="width: 'auto'" height="200" ref="refTable2" :fit="true" class="mt-4"
      :show-summary="showSummary" :summary-method="getSummaries">
      <el-table-column prop="id" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="amount1" label="数值 1（元）">
      </el-table-column>
      <el-table-column prop="amount2" label="数值 2（元）">
      </el-table-column>
      <el-table-column prop="amount3" label="数值 3（元）">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { handleExportTable } from './xlsx'
export default {
  data() {
    return {
      showSummary: true,
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      tableData2: [{
        id: '12987122',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        id: '12987123',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '12987125',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '12987126',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }]
    }
  },
  methods: {
    handleExport() {
      const ele = this.$refs.refTable.$el
      handleExportTable(this.tableData, { element: ele })
    },
    getSummaries1(param) {
      const { columns, data } = param;
      const sums = [];

      columns.forEach(item => {
        console.log(item)
        item.colSpan = 1
        item.rowSpan = 1

        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        })
      })
  
      return sums
    },

    handleExport2() {
      const ele = this.$refs.refTable2.$el
      handleExportTable(this.tableData, { element: ele })
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      console.log(columns, data)
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += ' 元';
        } else {
          sums[index] = 'N/A';
        }
      });

      return sums;
    }

  }
}
</script>

<style scoped lang="scss"></style>
