import { ref, defineComponent } from 'vue';
import { 
  Info, 
  HelpCircle, 
  Search, 
  RotateCcw, 
  Eye, 
  ChevronDown, 
  Calendar 
} from 'lucide-vue-next';

export default defineComponent({
  name: 'StudentManagement',
  components: {
    Info,
    HelpCircle,
    Search,
    RotateCcw,
    Eye,
    ChevronDown,
    Calendar
  },
  setup() {
    const students = ref([
      {
        id: 1,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1&backgroundColor=b6e3f4',
        nickname: '魔果1113',
        name: '-',
        phone: '139****1113',
        type: 'free',
        tags: '-',
        joinDate: '2026-01-21',
        paidDate: '-'
      },
      {
        id: 2,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2&backgroundColor=ffdfbf',
        nickname: '魔果4584',
        name: '刘先生',
        phone: '136****4584',
        type: 'free',
        tags: '-',
        joinDate: '2025-05-21',
        paidDate: '-'
      },
      {
        id: 3,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3&backgroundColor=c0aede',
        nickname: '魔果7455',
        name: '-',
        phone: '136****7455',
        type: 'free',
        tags: '-',
        joinDate: '2025-03-21',
        paidDate: '-'
      },
      {
        id: 4,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4&backgroundColor=ffd5dc',
        nickname: '王鑫老师',
        name: '王老师',
        phone: '188****2260',
        type: 'paid',
        tags: '-',
        joinDate: '2025-03-21',
        paidDate: '2026-01-21'
      },
      {
        id: 5,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5&backgroundColor=d1d4f9',
        nickname: '质心张老师',
        name: '质心学院',
        phone: '186****6541',
        type: 'free',
        tags: '-',
        joinDate: '2025-03-21',
        paidDate: '-'
      },
      {
        id: 6,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=6&backgroundColor=c0aede',
        nickname: '考研小助手',
        name: '-',
        phone: '178****6903',
        type: 'paid',
        tags: '-',
        joinDate: '2024-12-05',
        paidDate: '2024-12-05'
      }
    ]);

    return {
      students
    };
  },
  template: `
    <div class="flex flex-col h-full space-y-4">
      <!-- 顶部提示条 (Alert Banner) -->
      <div class="flex items-center justify-between bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800/30">
        <div class="flex items-center text-purple-700 dark:text-purple-300">
          <Info class="w-5 h-5 mr-2 flex-shrink-0" />
          <span class="text-sm">您可在此查看学员数据以及定向运营指定学员</span>
        </div>
        <button class="flex items-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">
          <HelpCircle class="w-4 h-4 mr-1" />
          使用帮助
        </button>
      </div>

      <!-- 主内容区 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex-1 flex flex-col overflow-hidden">
        
        <!-- 标题与全局操作区 -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-slate-100 dark:border-slate-700/50 gap-4">
          <div class="flex items-center">
            <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100">学员列表</h2>
            <span class="ml-3 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs font-medium">
              {{ students.length }} 个学员
            </span>
          </div>
          <div class="flex items-center space-x-3">
            <button class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              标签管理
            </button>
            <button class="px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/30 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors">
              打标签
            </button>
            <button class="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors shadow-sm shadow-primary-600/20">
              导出
            </button>
          </div>
        </div>

        <!-- 筛选区 (Filter Bar) -->
        <div class="p-5 border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <!-- 搜索昵称 -->
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search class="h-4 w-4 text-slate-400" />
              </div>
              <input type="text" placeholder="搜索学员昵称..." class="block w-full pl-9 pr-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors" />
            </div>
            
            <!-- 手机号 -->
            <div>
              <input type="text" placeholder="手机号" class="block w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors" />
            </div>

            <!-- 学员类型 -->
            <div class="relative">
              <select class="block w-full pl-3 pr-10 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors">
                <option value="">学员类型</option>
                <option value="free">免费</option>
                <option value="paid">付费</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
                <ChevronDown class="h-4 w-4" />
              </div>
            </div>

            <!-- 选择标签 -->
            <div class="relative">
              <select class="block w-full pl-3 pr-10 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors">
                <option value="">选择标签</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
                <ChevronDown class="h-4 w-4" />
              </div>
            </div>

            <!-- 日期范围与搜索按钮 -->
            <div class="flex items-center space-x-2 xl:col-span-1 lg:col-span-2 md:col-span-2">
              <div class="relative flex-1 flex items-center border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 overflow-hidden focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-500 transition-colors">
                <div class="pl-3 text-slate-400">
                  <Calendar class="h-4 w-4" />
                </div>
                <input type="text" placeholder="开始日期" class="w-full px-2 py-2 text-sm bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none" />
                <span class="text-slate-400 text-sm">至</span>
                <input type="text" placeholder="结束日期" class="w-full px-2 py-2 text-sm bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none" />
              </div>
              <button class="p-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors flex-shrink-0">
                <Search class="w-5 h-5" />
              </button>
              <button class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0" title="重置">
                <RotateCcw class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- 表格区 (Table) -->
        <div class="flex-1 overflow-auto">
          <table class="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr class="bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th class="p-4 w-12 text-center">
                  <input type="checkbox" class="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                </th>
                <th class="p-4 font-medium">用户昵称/用户姓名</th>
                <th class="p-4 font-medium">手机号</th>
                <th class="p-4 font-medium">学员类型</th>
                <th class="p-4 font-medium">标签</th>
                <th class="p-4 font-medium">加入/付费时间</th>
                <th class="p-4 font-medium text-right pr-8">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-700/50">
              <tr v-for="student in students" :key="student.id" class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                <td class="p-4 text-center">
                  <input type="checkbox" class="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                </td>
                <td class="p-4">
                  <div class="flex items-center space-x-3">
                    <img :src="student.avatar" alt="Avatar" class="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 dark:border-slate-700 object-cover" />
                    <div class="flex flex-col">
                      <span class="text-sm font-medium text-slate-900 dark:text-slate-100">{{ student.nickname }}</span>
                      <span class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ student.name }}</span>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-sm text-slate-600 dark:text-slate-300 font-mono">
                  {{ student.phone }}
                </td>
                <td class="p-4">
                  <span v-if="student.type === 'paid'" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border border-green-200/50 dark:border-green-800/30">
                    付费
                  </span>
                  <span v-else class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-600/50">
                    免费
                  </span>
                </td>
                <td class="p-4 text-sm text-slate-500 dark:text-slate-400">
                  {{ student.tags }}
                </td>
                <td class="p-4">
                  <div class="flex flex-col text-sm">
                    <span class="text-slate-700 dark:text-slate-300">{{ student.joinDate }}</span>
                    <span class="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{{ student.paidDate }}</span>
                  </div>
                </td>
                <td class="p-4 text-right pr-8">
                  <button class="inline-flex items-center text-sm font-medium text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    <Eye class="w-4 h-4 mr-1.5" />
                    详情
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- 分页 (Pagination Mock) -->
        <div class="flex items-center justify-between p-4 border-t border-slate-100 dark:border-slate-700/50 bg-white dark:bg-slate-800">
          <div class="text-sm text-slate-500 dark:text-slate-400">
            显示 1 到 {{ students.length }} 条，共 {{ students.length }} 条记录
          </div>
          <div class="flex items-center space-x-2">
            <button class="px-3 py-1 border border-slate-200 dark:border-slate-600 rounded text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50" disabled>上一页</button>
            <button class="px-3 py-1 border border-primary-500 bg-primary-50 dark:bg-primary-900/20 rounded text-sm text-primary-600 dark:text-primary-400 font-medium">1</button>
            <button class="px-3 py-1 border border-slate-200 dark:border-slate-600 rounded text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700">下一页</button>
          </div>
        </div>

      </div>
    </div>
  `
});
