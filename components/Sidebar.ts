import { defineComponent, ref, computed } from 'vue';
import { 
  LayoutGrid, 
  BookOpen, 
  FileText, 
  CreditCard, 
  Megaphone, 
  Building2, 
  BarChart3, 
  Settings, 
  ChevronDown, 
  ChevronRight, 
  Zap, 
  GraduationCap, 
  Store, 
  ChevronsLeft,
  ChevronsRight,
  Moon,
  Sun
} from 'lucide-vue-next';

export default defineComponent({
  name: 'Sidebar',
  components: {
    LayoutGrid, BookOpen, FileText, CreditCard,
    Megaphone, Building2, BarChart3, Settings, ChevronDown, ChevronRight, Zap, GraduationCap, Store,
    ChevronsLeft, ChevronsRight, Moon, Sun
  },
  props: {
    currentView: {
      type: String,
      default: 'dashboard'
    },
    isDark: {
      type: Boolean,
      default: false
    }
  },
  emits: ['navigate', 'toggle-theme'],
  setup(props, { emit }) {
    const isCollapsed = ref(false);

    const navItems = ref([
      { id: 'dashboard', label: '概览', icon: 'LayoutGrid', hasSubmenu: false },
      { 
        id: 'teaching', 
        label: '教学管理', 
        icon: 'BookOpen', 
        hasSubmenu: true, 
        isOpen: true,
        children: [
            { id: 'course-management', label: '课程管理' },
            { id: 'homework', label: '作业管理' },
        ]
      },
      { 
        id: 'basic-info', 
        label: '基本资料', 
        icon: 'FileText', 
        hasSubmenu: true,
        children: [
            { id: 'basic-info', label: '基本信息' },
            { id: 'qualifications', label: '办学资质' }
        ]
      },
      { 
        id: 'finance-group', // Renamed from 'finance' to avoid conflict with child
        label: '财务管理', 
        icon: 'CreditCard', 
        hasSubmenu: true,
        isOpen: true,
        children: [
            { id: 'finance', label: '交易管理' },
            { id: 'refunds', label: '退款管理' }
        ]
      },
      { 
        id: 'edu-affairs', 
        label: '教务管理', 
        icon: 'GraduationCap', 
        hasSubmenu: true,
        children: [
            { id: 'edu-affairs', label: '学员管理' },
            { id: 'class-scheduling', label: '排课管理' },
            { id: 'small-class', label: '小班课管理' }
        ]
      },
      { 
        id: 'marketing', 
        label: '营销工具', 
        icon: 'Megaphone', 
        hasSubmenu: true,
        children: [
            { id: 'marketing', label: '营销中心' },
            { id: 'coupons', label: '优惠券' }
        ]
      },
      { 
        id: 'institution', 
        label: '机构管理', 
        icon: 'Building2', 
        hasSubmenu: true,
        isOpen: true,
        children: [
            { id: 'staff', label: '人员管理' },
            { id: 'settlement', label: '结算管理' },
            { id: 'keys', label: '密钥12' }
        ]
      },
      { 
        id: 'stats', 
        label: '数据统计', 
        icon: 'BarChart3', 
        hasSubmenu: true,
        children: [
            { id: 'stats', label: '数据概览' },
            { id: 'traffic-analysis', label: '流量分析' },
            { id: 'learning-data', label: '学习数据' }
        ]
      },
      { 
        id: 'settings', 
        label: '设置', 
        icon: 'Settings', 
        hasSubmenu: true,
        isOpen: false,
        children: [
            { id: 'profile', label: '个人资料' },
            { id: 'preferences', label: '偏好设置' },
            { id: 'advanced-settings', label: '高级设置' }
        ]
      },
    ]);

    const isActive = (item) => {
        if (props.currentView === item.id) return true;
        if (item.children && item.children.some(child => child.id === props.currentView)) return true;
        return false;
    };

    const handleClick = (item) => {
        if (isCollapsed.value) {
            if (item.children || item.hasSubmenu) {
                isCollapsed.value = false;
                item.isOpen = true;
                return;
            }
        }

        if (item.children || item.hasSubmenu) {
             item.isOpen = !item.isOpen;
             if(!item.children) return; 
        }
        emit('navigate', item.id);
    };

    const handleChildClick = (childId) => {
        emit('navigate', childId);
    };

    const toggleCollapse = () => {
        isCollapsed.value = !isCollapsed.value;
    };

    const toggleTheme = () => {
        emit('toggle-theme');
    };

    return { navItems, handleClick, handleChildClick, isCollapsed, toggleCollapse, isActive, toggleTheme };
  },
  template: `
  <aside 
    class="bg-white dark:bg-slate-900 flex flex-col h-full font-sans border-r border-slate-100 dark:border-slate-800 relative z-20 transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
    :class="isCollapsed ? 'w-[80px]' : 'w-[260px]'"
  >
    <!-- Brand -->
    <div class="h-[70px] flex items-center px-6 overflow-hidden" :class="isCollapsed ? 'justify-center px-0' : ''">
      <div class="flex items-center gap-3 transition-all duration-300">
         <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/30 flex-shrink-0">
            <Zap class="w-5 h-5 fill-white" />
         </div>
         <span 
            class="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight whitespace-nowrap transition-all duration-300 origin-left"
            :class="isCollapsed ? 'opacity-0 scale-50 w-0 hidden' : 'opacity-100 scale-100'"
         >
            霍金课堂
         </span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-4 space-y-1 custom-scrollbar overflow-x-hidden" :class="isCollapsed ? 'px-3' : 'px-4'">
      <div v-for="item in navItems" :key="item.id">
          <!-- Parent Item -->
          <div 
            @click="handleClick(item)"
            class="group flex items-center rounded-xl cursor-pointer transition-all duration-200 relative"
            :class="[
              isActive(item)
                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200',
              isCollapsed ? 'justify-center py-3' : 'justify-between px-3 py-2.5'
            ]"
            :title="isCollapsed ? item.label : ''"
          >
            <div class="flex items-center gap-3">
              <component 
                :is="item.icon" 
                class="w-5 h-5 transition-colors flex-shrink-0"
                stroke-width="2"
                :class="isActive(item) ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'" 
              />
              <span 
                class="text-[14px] whitespace-nowrap transition-all duration-200"
                :class="isCollapsed ? 'hidden opacity-0 w-0' : 'opacity-100'"
              >
                {{ item.label }}
              </span>
            </div>
            
            <div v-if="item.hasSubmenu && !isCollapsed" class="text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                <ChevronDown v-if="item.isOpen" class="w-4 h-4" />
                <ChevronRight v-else class="w-4 h-4" />
            </div>
          </div>

          <!-- Submenu -->
          <div v-if="item.children && item.isOpen && !isCollapsed" class="pl-11 pr-2 py-1 space-y-1 animate-fade-in">
             <div 
                v-for="child in item.children" 
                :key="child.id"
                @click="handleChildClick(child.id)"
                class="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors relative"
                :class="[
                   currentView === child.id 
                    ? 'text-primary-600 dark:text-primary-400 font-medium bg-white dark:bg-slate-800 shadow-sm' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                ]"
             >
                <span class="text-[13px]">{{ child.label }}</span>
                <div v-if="currentView === child.id" class="w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-primary-400"></div>
             </div>
          </div>
      </div>
    </nav>
    
    <!-- Footer Redesign -->
    <div class="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1">
       
       <!-- Theme Toggle -->
       <button 
         @click="toggleTheme"
         class="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer group"
         :class="isCollapsed ? 'justify-center px-0' : ''"
         :title="isDark ? '切换亮色模式' : '切换深色模式'"
       >
         <Sun v-if="isDark" class="w-5 h-5 transition-transform group-hover:rotate-45" />
         <Moon v-else class="w-5 h-5 transition-transform group-hover:-rotate-12" />
         
         <span 
            class="text-[14px] font-medium whitespace-nowrap transition-all duration-200"
            :class="isCollapsed ? 'hidden opacity-0 w-0' : 'opacity-100'"
         >
            {{ isDark ? '亮色模式' : '深色模式' }}
         </span>
       </button>

       <!-- Collapse Switch -->
       <button 
         @click="toggleCollapse"
         class="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer group"
         :class="isCollapsed ? 'justify-center px-0' : ''"
         title="收起菜单"
       >
         <ChevronsRight v-if="isCollapsed" class="w-5 h-5" />
         <ChevronsLeft v-else class="w-5 h-5" />
         <span 
            class="text-[14px] font-medium whitespace-nowrap transition-all duration-200"
            :class="isCollapsed ? 'hidden opacity-0 w-0' : 'opacity-100'"
         >
            收起
         </span>
       </button>

    </div>
  </aside>
  `
});