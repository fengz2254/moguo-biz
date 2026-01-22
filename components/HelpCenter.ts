import { defineComponent } from 'vue';
import { HelpCircle } from 'lucide-vue-next';

export default defineComponent({
  name: 'HelpCenter',
  components: { HelpCircle },
  setup() {
    const questions = [
      "如何创建一门课程？",
      "如何开启我的直播？",
      "如何设置主页？",
      "如何进行人员同事的添加？",
      "如何结算您的收入？（机构）",
      "如何结算您的收入？（个人）"
    ];
    return { questions };
  },
  template: `
  <div class="bg-white rounded-2xl p-6 shadow-card border border-slate-100/50">
    <div class="flex justify-between items-center mb-6 border-l-4 border-primary-500 pl-3">
      <h3 class="text-base font-bold text-slate-800">帮助中心</h3>
      <button class="text-xs text-primary-600 hover:underline font-medium">查看更多</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        <div 
            v-for="(q, idx) in questions" 
            :key="idx" 
            class="flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 cursor-pointer transition-colors group"
        >
            <span class="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary-500 transition-colors"></span>
            <span>{{ q }}</span>
        </div>
    </div>
  </div>
  `
});