import *as XLSX from "xlsx";
import XLSXS from "xlsx-style";


/**
 * 导出表格为excel文件
 * @param {Array} tableData element表格数据
 * @param {Object} param 配置项
 * @param {String|Element} param.element 表格的dom 或者选择器id
 * @param {String|Number} param.filename 保存文件名称
 */

export function handleExportTable(tableData, { element = '', filename = Date.now(), delFirst = true, ...rest } = {}) {
  if (tableData.length > 0) {
    let xlsxParam = { ...rest }   //这个保证表格只进行解析 不做运算
    const tableElement = typeof element === 'string' ? document.querySelector(`#${element}`) : element
    let wb = XLSX.utils.table_to_sheet(tableElement, xlsxParam);//export-table为表格的id名

    let book = XLSX.utils.table_to_book(tableElement, xlsxParam)
    // 根据需要设置sheet的每一行，每一列-格式
    // wb[sheets]['B2"] = { t:"d", v: 1000 }//第一行，第二列
    //t表示类型，s是字符串，n是数字,d是日期类型
    // this.setExlStyle(wb,[leftArr,rightArr])//设置excel样式
    // 表格有合并单元格时执行-只支持表头合并单元格
    // var data = this.addRangeBorder(wb['!merges'],wb) //合并项添加边框
    // var filedata = this.sheet2blob(data)
    // 常规表格执行-无合并单元格
    console.log('wb,book', wb, book)


    // todo 删除第一行

    // if (delFirst) {
    //   wb = Object.keys(wb).filter(item => !(/A\d+/.test(item))).reduce((a, b) => {
    //     if (['!fullref', '!ref'].includes(b)) {
    //       a[b] = wb[b].replace(/^A/, 'B')
    //     } else {
    //       a[b] = wb[b]
    //     }

    //     return a
    //   }, {})

    //   wb['!merges'] = wb['!merges'].filter(item => item.s.r !== 0)
    // }

    // wb = {
    //   ...wb,
    //   ['!merges']: wb['!merges'].slice(1)
    // }

    let filedata = sheet2blob(wb)

    openDownloadDialog(filedata, filename + ".xlsx")
  } else {
    this.$message({
      type: 'error',
      message: '暂时没有可导出的数据'
    })
  }
}


function sheet2blob(sheet, sheetName) {
  sheetName = sheetName || 'sheet1';
  var workbook = {
    SheetNames: [sheetName],
    Sheets: {}
  };
  workbook.Sheets[sheetName] = sheet; // 生成excel的配置项
  var wopts = {
    bookType: 'xlsx', // 要生成的文件类型
    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    type: 'binary'
  };
  var wbout = XLSXS.write(workbook, wopts);
  var blob = new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }); // 字符串转ArrayBuffer
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }
  return blob;
}

function openDownloadDialog(url, saveName) {
  if (typeof url == 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url); // 创建blob地址
  }
  var aLink = document.createElement('a');
  aLink.href = url;
  aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
  var event;
  if (window.MouseEvent) event = new MouseEvent('click');
  else {
    event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  }
  aLink.dispatchEvent(event);
}


