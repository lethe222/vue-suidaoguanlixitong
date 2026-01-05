module.exports = {
  lines: [
    {
      name: '隧道完成进度(%)',
      type: 'line',
      data: [15, 28, 42, 58, 68, 79, 85, 88, 92, 95, 97, 99],
    },
    {
      name: '安全检测合格率(%)',
      type: 'line',
      data: [82, 84, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95],
    },
    {
      name: '质量评分',
      type: 'line',
      data: [78, 80, 82, 84, 85, 86, 87, 88, 89, 90, 91, 92],
    },
  ],
  radars: [
    {
      value: [85, 80, 88, 78, 92, 87, 90],
      name: '京沈高铁隧道群',
    },
    {
      value: [82, 78, 85, 82, 88, 85, 87],
      name: '南北交通隧道',
    },
    {
      value: [88, 85, 90, 85, 95, 90, 92],
      name: '城市地铁5号线',
    },
  ],
  piecharts: [
    { value: 450, name: '已完成' },
    { value: 320, name: '施工中' },
    { value: 180, name: '待施工' },
    { value: 80, name: '质检中' },
    { value: 35, name: '延期待修' },
  ],
  barcharts: [85, 92, 78, 88, 95, 82, 90, 87, 91, 84, 89, 93],
  maps: [
    { name: '东城区', value: 5 },
    { name: '西城区', value: 8 },
    { name: '朝阳区', value: 25 },
    { name: '海淀区', value: 32 },
    { name: '丰台区', value: 18 },
    { name: '石景山区', value: 12 },
    { name: '门头沟区', value: 45 },
    { name: '房山区', value: 58 },
    { name: '通州区', value: 28 },
    { name: '顺义区', value: 22 },
    { name: '昌平区', value: 38 },
    { name: '大兴区', value: 30 },
    { name: '怀柔区', value: 15 },
    { name: '平谷区', value: 10 },
    { name: '密云区', value: 20 },
    { name: '延庆区', value: 35 },
  ],
}
