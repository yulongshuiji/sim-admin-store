/**
 * 通用js方法封装处理
 * Copyright (c) 2019 kent
 */

const baseURL = process.env.VUE_APP_BASE_API

// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/')
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

// 表单重置
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields()
  }
}

// 添加日期范围
export function addDateTimeRange(queryParams, value) {
  let search = queryParams;
  let now = new Date();
  let year = now.getFullYear();
  let startYear;
  let endYear;
  let startMonth;
  let endMonth;
  let startDay;
  let endDay;
  let startDate;
  let endDate;
  switch(parseInt(value)){
    // 今天
    case 1:
      startYear = year;
      endYear = year;
      startMonth = plusZero(now.getMonth() + 1);
      endMonth = plusZero(now.getMonth() + 1);
      startDay = plusZero(now.getDate());
      endDay = plusZero(now.getDate());
      break;
    // 昨天
    case 2:
      now.setTime(now.getTime()-24*60*60*1000);
      startYear = now.getFullYear();
      endYear = now.getFullYear();
      startMonth = plusZero(now.getMonth() + 1);
      endMonth = plusZero(now.getMonth() + 1);
      startDay = plusZero(now.getDate());
      endDay = plusZero(now.getDate());
      break;
    // 本周
    case 3:
      var dateWeek = new Date();
      dateWeek.setDate(dateWeek.getDate() - dateWeek.getDay() + 1);
      startYear = dateWeek.getFullYear();
      startMonth = plusZero(dateWeek.getMonth() + 1);
      startDay = dateWeek.getDate();
      dateWeek.setDate(dateWeek.getDate() + 6);
      endYear = dateWeek.getFullYear();
      endMonth = plusZero(dateWeek.getMonth() + 1);
      endDay = dateWeek.getDate();
      break;
    // 上周
    case 4:
      var dateLastWeek = new Date();
      dateLastWeek.setDate(dateLastWeek.getDate() - 7 - dateLastWeek.getDay() + 1);
      startYear = dateLastWeek.getFullYear();
      startMonth = plusZero(dateLastWeek.getMonth() + 1);
      startDay = dateLastWeek.getDate();
      dateLastWeek.setDate(dateLastWeek.getDate() + 6);
      endYear = dateLastWeek.getFullYear();
      endMonth = plusZero(dateLastWeek.getMonth() + 1);
      endDay = dateLastWeek.getDate();
      break;
    // 本月
    case 5:
      startYear = year;
      endYear = year;
      startMonth = plusZero(now.getMonth() + 1);
      endMonth = plusZero(now.getMonth() + 1);
      startDay = '01';
      endDay = plusZero(new Date().getDate());
      break;
    // 上月
    case 6:
      startYear = year;
      endYear = year;
      startMonth = plusZero(now.getMonth());
      endMonth = plusZero(now.getMonth());
      startDay = '01';
      endDay = plusZero(new Date(year,endMonth,0).getDate());
      break;
    // 全部
    case 7:
      startYear = '2024';
      endYear = year;
      startMonth = '01';
      endMonth = plusZero(now.getMonth() + 1);
      startDay = '01';
      endDay = plusZero(new Date().getDate());
      break;
  }
  if(startMonth == 0){
    startYear = startYear-1;
    startMonth = 12;
  }
  if(endMonth == 0){
    endYear = endYear-1;
    endMonth = 12;
  }
  startDate = startYear + '-' + startMonth + '-' + startDay + ' 00:00:00'
  endDate = endYear + '-' + endMonth + '-' + endDay + ' 23:59:59'
  search.start_time = startDate
  search.end_time = endDate
  return search
}

function plusZero(str){
  if(str != undefined){
    if(str >= 1 && str <= 9){
      str = "0" + str.toString();
    }
  }
  return str;
}

// 回显数据字典
export function selectDictLabel(datas, value) {
  var actions = []
  Object.keys(datas).map((key) => {
    if (datas[key].dictValue == ('' + value)) {
      actions.push(datas[key].dictLabel)
      return false
    }
  })
  return actions.join('')
}

// 通用下载方法
export function download(fileName) {
  window.location.href = baseURL + '/common/download?fileName=' + encodeURI(fileName) + '&delete=' + true
}

// 字符串格式化(%s )
export function sprintf(str) {
  var args = arguments; var flag = true; var i = 1
  str = str.replace(/%s/g, function() {
    var arg = args[i++]
    if (typeof arg === 'undefined') {
      flag = false
      return ''
    }
    return arg
  })
  return flag ? str : ''
}

// 数字格式化
export function numberWithCommas(x) {
  x = parseFloat(x);
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
    x = x.replace(pattern, "$1,$2");
  return x;
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
  if (!str || str == 'undefined' || str == 'null') {
    return ''
  }
  return str
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
  const config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  }

  var childrenListMap = {}
  var nodeIds = {}
  var tree = []

  for (const d of data) {
    const parentId = d[config.parentId]
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = []
    }
    nodeIds[d[config.id]] = d
    childrenListMap[parentId].push(d)
  }

  for (const d of data) {
    const parentId = d[config.parentId]
    if (nodeIds[parentId] == null) {
      tree.push(d)
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t)
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]]
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c)
      }
    }
  }
  return tree
}
