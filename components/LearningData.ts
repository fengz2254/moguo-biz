import { ref, computed, defineComponent } from 'vue';
import { 
  Info, 
  Search, 
  RotateCcw, 
  Calendar,
  Download
} from 'lucide-vue-next';

export default defineComponent({
  name: 'LearningData',
  components: {
    Info,
    Search,
    RotateCcw,
    Calendar,
    Download
  },
  setup() {
    const activeTab = ref('today');
    
    // Using EXACT data from the screenshot
    const historyData = [
      {
        id: 1,
        studentName: '测试学员B',
        studentPhone: '139****8002',
        unitName: 'test_video',
        courseName: '直播点播',
        date: '2026-05-23',
        type: '点播',
        classType: '大班课',
        teacherCount: '1人',
        duration: '00 时 01 分'
      },
      {
        id: 2,
        studentName: '测试学员A',
        studentPhone: '139****8001',
        unitName: '《哈佛经典谈判术》1',
        courseName: '直播点播',
        date: '2026-05-23',
        type: '点播',
        classType: '大班课',
        teacherCount: '1人',
        duration: '00 时 03 分'
      }
    ];

    const todayData = [
      {
        id: 1,
        studentName: '测试学员A',
        studentPhone: '139****8001',
        unitName: '《哈佛经典谈判术》 1',
        courseName: '直播点播',
        date: '2026-05-27',
        type: '点播',
        classType: '大班课',
        teacherCount: '1人',
        duration: '00 时 03 分'
      },
      {
        id: 2,
        studentName: '测试学员B',
        studentPhone: '139****8002',
        unitName: 'test_video',
        courseName: '直播点播',
        date: '2026-05-27',
        type: '点播',
        classType: '大班课',
        teacherCount: '1人',
        duration: '00 时 01 分'
      }
    ];

    const tableData = computed(() => activeTab.value === 'today' ? todayData : historyData);

    return {
      activeTab,
      tableData
    };
  },
  template: `
    <div class="flex flex-col h-full space-y-4">
      
      <!-- Tabs (Pills) -->
      <div class="flex items-center space-x-2">
        <button 
          @click="activeTab = 'history'"
          class="px-4 py-1.5 text-[14px] font-medium rounded-full transition-colors border"
          :class="activeTab === 'history' ? 'bg-primary-500 text-white border-primary-500 shadow-sm' : 'bg-transparent text-slate-600 border-slate-300 dark:border-slate-600 hover:bg-slate-200/50 dark:hover:bg-slate-800 dark:text-slate-300'"
        >
          历史数据(次日更新)
        </button>
        <button 
          @click="activeTab = 'today'"
          class="px-4 py-1.5 text-[14px] font-medium rounded-full transition-colors border"
          :class="activeTab === 'today' ? 'bg-primary-500 text-white border-primary-500 shadow-sm' : 'bg-transparent text-slate-600 border-slate-300 dark:border-slate-600 hover:bg-slate-200/50 dark:hover:bg-slate-800 dark:text-slate-300'"
        >
          今日学习(实时)
        </button>
      </div>

      <!-- 提示条与全局操作 (Alert & Global Actions) -->
      <div v-if="activeTab === 'history'" class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <!-- 柔和的提示条 -->
        <div class="flex-1 flex items-center bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 border border-primary-100 dark:border-primary-800/30">
          <Info class="w-5 h-5 text-primary-500 mr-2 flex-shrink-0" />
          <span class="text-sm text-primary-700 dark:text-primary-300">每日的学习数据会在次日进行同步展示</span>
        </div>
        
        <!-- 下载按钮 -->
        <button class="flex-shrink-0 flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors shadow-sm shadow-primary-500/20">
          <Download class="w-4 h-4 mr-2" />
          下载数据
        </button>
      </div>

      <!-- 主内容面板 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex-1 flex flex-col overflow-hidden">
        
        <!-- 筛选区 (Filter Bar) -->
        <div class="p-5 border-b border-slate-100 dark:border-slate-700/50 bg-white dark:bg-slate-800">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-center">
            
            <!-- 学员姓名 -->
            <div class="relative xl:col-span-1 lg:col-span-1 md:col-span-1">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search class="h-4 w-4 text-slate-400" />
              </div>
              <input type="text" placeholder="请输入学员姓名" class="block w-full pl-9 pr-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors" />
            </div>
            
            <!-- 课时名称 -->
            <div class="xl:col-span-1 lg:col-span-1 md:col-span-1">
              <input type="text" placeholder="课时名称" class="block w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors" />
            </div>

            <!-- 课程名称 -->
            <div class="xl:col-span-1 lg:col-span-1 md:col-span-1">
              <input type="text" placeholder="课程名称" class="block w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors" />
            </div>

            <!-- 日期范围 -->
            <div v-if="activeTab === 'history'" class="flex items-center space-x-2 xl:col-span-2 lg:col-span-2 md:col-span-2">
              <div class="relative flex-1">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar class="h-4 w-4 text-slate-400" />
                </div>
                <input type="text" placeholder="2026-05-22" class="block w-full pl-9 pr-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors" />
              </div>
              <span class="text-slate-400 px-1">~</span>
              <div class="relative flex-1">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar class="h-4 w-4 text-slate-400" />
                </div>
                <input type="text" placeholder="2026-05-28" class="block w-full pl-9 pr-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors" />
              </div>
            </div>

            <!-- 搜索与重置按钮 -->
            <div class="flex items-center space-x-2 xl:col-span-1 lg:col-span-1 md:col-span-1">
              <button class="px-5 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors">
                搜索
              </button>
              <button class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors" title="重置">
                <RotateCcw class="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>

        <!-- 数据表格 (Table) -->
        <div class="flex-1 overflow-auto">
          <table class="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr class="bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-[13px] font-medium">
                <th class="p-4 pl-6">学员</th>
                <th class="p-4">课时名称</th>
                <th class="p-4">课程名称</th>
                <th class="p-4">上课日期</th>
                <th class="p-4">类型</th>
                <th class="p-4">班型</th>
                <th class="p-4">直播老师数量</th>
                <th class="p-4 pr-6 text-right">学习时长</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-700/50">
              <tr v-for="row in tableData" :key="row.id" class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <!-- 学员信息 (双行层级) -->
                <td class="p-4 pl-6">
                  <div class="flex flex-col">
                    <span class="text-[14px] font-medium text-slate-900 dark:text-slate-100">{{ row.studentName }}</span>
                    <span class="text-[13px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">{{ row.studentPhone }}</span>
                  </div>
                </td>
                
                <td class="p-4 text-sm text-slate-700 dark:text-slate-300">{{ row.unitName }}</td>
                <td class="p-4 text-sm text-slate-700 dark:text-slate-300">{{ row.courseName }}</td>
                <td class="p-4 text-sm text-slate-700 dark:text-slate-300">{{ row.date }}</td>
                <td class="p-4 text-sm text-slate-700 dark:text-slate-300">{{ row.type }}</td>
                <td class="p-4 text-sm text-slate-700 dark:text-slate-300">{{ row.classType }}</td>
                <td class="p-4 text-sm text-slate-700 dark:text-slate-300">{{ row.teacherCount }}</td>
                
                <!-- 学习时长 (强调) -->
                <td class="p-4 pr-6 text-sm font-medium text-slate-800 dark:text-slate-200 text-right">
                  {{ row.duration }}
                </td>
              </tr>
              <!-- 空状态 (可选, 这里仅展示两行静态数据) -->
              <tr v-if="tableData.length === 0">
                <td colspan="8" class="p-12 text-center text-slate-400 dark:text-slate-500 text-sm">
                  暂无匹配数据
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  `
});
