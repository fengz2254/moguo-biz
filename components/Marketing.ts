import { defineComponent } from 'vue';
import { Ticket, Zap, Users, Share2, Gift, MessageCircle, BarChart, Trophy, Search } from 'lucide-vue-next';

export default defineComponent({
  name: 'Marketing',
  components: { Ticket, Zap, Users, Share2, Gift, MessageCircle, BarChart, Trophy, Search },
  setup() {
    const tools = [
      { name: '优惠券', desc: '创建满减、折扣券', icon: 'Ticket', color: 'bg-[#F2CF5B]' },
      { name: '限时秒杀', desc: '营造紧迫感促销', icon: 'Zap', color: 'bg-[#EF7EAD]' },
      { name: '多人拼团', desc: '裂变增长工具', icon: 'Users', color: 'bg-[#0176D3]' },
      { name: '推广海报', desc: '一键生成分享图', icon: 'Share2', color: 'bg-[#3BA755]' },
      { name: '积分商城', desc: '提升学员留存', icon: 'Gift', color: 'bg-[#FF9F40]' },
      { name: '群发消息', desc: '触达老客户', icon: 'MessageCircle', color: 'bg-[#4BCA81]' },
      { name: '分销中心', desc: '招募推广员', icon: 'BarChart', color: 'bg-[#7F8DE1]' },
      { name: '打卡活动', desc: '增加日活', icon: 'Trophy', color: 'bg-[#00A1E0]' },
    ];
    return { tools };
  },
  template: `
  <div class="flex flex-col h-full p-4 space-y-4 max-w-[1400px] mx-auto">
    
    <!-- Header with Background -->
    <div class="bg-[#F3F5F7] border border-neutral-300 rounded p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
            <h1 class="text-[24px] font-light text-neutral-900">营销中心</h1>
            <p class="text-[14px] text-neutral-500 mt-2 max-w-xl">
                使用这些工具来吸引更多学员，提高转化率，并保持客户参与度。所有工具均已集成到您的 CRM 数据中。
            </p>
        </div>
        <div class="w-full md:w-auto">
            <button class="bg-brand-500 text-white px-6 py-2 rounded-[4px] text-[13px] font-bold hover:bg-brand-600 shadow-sm transition-colors">
                查看双十一活动方案
            </button>
        </div>
    </div>

    <!-- Search/Filter Bar -->
    <div class="relative max-w-md">
        <input 
            type="text" 
            placeholder="查找营销工具..." 
            class="w-full pl-9 pr-4 py-2 text-[13px] border border-neutral-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 transition-all bg-white shadow-sm"
        />
        <Search class="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
    </div>

    <!-- Tools Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
            v-for="tool in tools" 
            :key="tool.name"
            class="bg-white border border-neutral-300 rounded-[4px] p-4 hover:shadow-slds-hover hover:border-brand-300 transition-all cursor-pointer group flex items-start gap-3"
        >
            <div 
                class="w-10 h-10 rounded-[4px] flex items-center justify-center text-white shrink-0 shadow-sm"
                :class="tool.color"
            >
                <component :is="tool.icon" class="w-5 h-5" stroke-width="2" />
            </div>
            <div>
                <h3 class="font-bold text-[14px] text-neutral-800 group-hover:text-brand-600 group-hover:underline">{{ tool.name }}</h3>
                <p class="text-[12px] text-neutral-500 mt-1 leading-snug">{{ tool.desc }}</p>
            </div>
        </div>
    </div>
  </div>
  `
});