import { defineComponent, ref } from 'vue';
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
  PanelLeftClose, 
  PanelLeftOpen 
} from 'lucide-vue-next';

export default defineComponent({
  name: 'Sidebar',
  components: {
    LayoutGrid, BookOpen, FileText, CreditCard,
    Megaphone, Building2, BarChart3, Settings, ChevronDown, ChevronRight, Zap, GraduationCap, Store,
    PanelLeftClose, PanelLeftOpen
  },
  props: {
    currentView: {
      type: String,
      default: 'dashboard'
    }
  },
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
            { id: 'small-class', label: '小班课管理' },
        ]
      },
      { id: 'basic-info', label: '基本资料', icon: 'FileText', hasSubmenu: true },
      { id: 'finance', label: '财务管理', icon: 'CreditCard', hasSubmenu: true },
      { id: 'edu-affairs', label: '教务管理', icon: 'GraduationCap', hasSubmenu: true },
      { id: 'marketing', label: '营销工具', icon: 'Megaphone', hasSubmenu: true },
      { id: 'institution', label: '机构管理', icon: 'Building2', hasSubmenu: true },
      { id: 'stats', label: '数据统计', icon: 'BarChart3', hasSubmenu: true },
      { 
        id: 'settings', 
        label: '设置', 
        icon: 'Settings', 
        hasSubmenu: true,
        isOpen: true,
        children: [
            { id: 'profile', label: '个人资料' },
            { id: 'preferences', label: '偏好设置' },
            { id: 'advanced-settings', label: '高级设置' }
        ]
      },
    ]);

    const handleClick = (item) => {
        if (isCollapsed.value) {
            // Auto expand if interacting with a collapsed menu item that has children
            if (item.children || item.hasSubmenu) {
                isCollapsed.value = false;
                item.isOpen = true;
                return;
            }
        }

        if (item.children || item.hasSubmenu) {
             item.isOpen = !item.isOpen;
             // If it has submenu but no children defined in this mockup, strictly don't navigate away in demo
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

    return { navItems, handleClick, handleChildClick, isCollapsed, toggleCollapse };
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
              currentView === item.id 
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
                :class="currentView === item.id ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'" 
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
          <div v-if="item.children && item.isOpen && !isCollapsed" class="pl-11 pr-2 py-1 space-y-1">
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
    
    <!-- Footer / User Profile -->
    <div class="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
       
       <!-- Collapse Switch -->
       <button 
         @click="toggleCollapse"
         class="flex items-center gap-3 px-2 py-2 text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
         :class="isCollapsed ? 'justify-center' : ''"
         :title="isCollapsed ? '展开菜单' : '收起菜单'"
       >
         <PanelLeftOpen v-if="isCollapsed" class="w-5 h-5" />
         <PanelLeftClose v-else class="w-5 h-5" />
         <span class="text-xs font-medium whitespace-nowrap" :class="isCollapsed ? 'hidden' : ''">收起菜单</span>
       </button>

       <!-- Profile -->
       <div class="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors" :class="isCollapsed ? 'justify-center p-0 mt-2' : ''">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" class="w-9 h-9 rounded-full bg-slate-200 flex-shrink-0" />
          <div class="flex-1 min-w-0 overflow-hidden" :class="isCollapsed ? 'hidden' : ''">
             <p class="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">赵峰</p>
             <p class="text-xs text-slate-500 dark:text-slate-400 truncate">超级管理员</p>
          </div>
       </div>
    </div>
  </aside>
  `
});