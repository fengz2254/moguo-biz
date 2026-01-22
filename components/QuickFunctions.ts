import { defineComponent } from 'vue';
import { Home, MonitorPlay, Receipt, FolderOpen, ClipboardList, Megaphone } from 'lucide-vue-next';

export default defineComponent({
  name: 'QuickFunctions',
  components: { Home, MonitorPlay, Receipt, FolderOpen, ClipboardList, Megaphone },
  setup() {
    const actions = [
      { label: '主页装修', icon: 'Home', bg: 'bg-primary-50', text: 'text-primary-600' },
      { label: '课程管理', icon: 'MonitorPlay', bg: 'bg-orange-50', text: 'text-orange-600' },
      { label: '交易管理', icon: 'Receipt', bg: 'bg-cyan-50', text: 'text-cyan-600' },
      { label: '素材中心', icon: 'FolderOpen', bg: 'bg-emerald-50', text: 'text-emerald-600' },
      { label: '题库', icon: 'ClipboardList', bg: 'bg-blue-50', text: 'text-blue-600' },
      { label: '营销工具', icon: 'Megaphone', bg: 'bg-purple-50', text: 'text-purple-600' },
    ];
    return { actions };
  },
  template: `
  <div class="bg-white rounded-2xl p-6 shadow-card border border-slate-100/50">
    <div class="flex items-center gap-2 mb-6 border-l-4 border-primary-500 pl-3">
      <h3 class="text-base font-bold text-slate-800">常用功能</h3>
    </div>
    
    <div class="grid grid-cols-3 md:grid-cols-6 gap-6">
        <button 
          v-for="item in actions" 
          :key="item.label"
          class="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-slate-50 transition-all group"
        >
          <div 
            class="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-sm"
            :class="[item.bg, item.text]"
          >
            <component :is="item.icon" class="w-7 h-7" stroke-width="2" />
          </div>
          <span class="text-sm font-medium text-slate-600 group-hover:text-slate-900">{{ item.label }}</span>
        </button>
    </div>
  </div>
  `
});