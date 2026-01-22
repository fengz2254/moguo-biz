import { defineComponent } from 'vue';
import { ShieldCheck, Video, Cloud, Ticket, FileText, HelpCircle } from 'lucide-vue-next';

export default defineComponent({
  name: 'RightPanel',
  components: { ShieldCheck, Video, Cloud, Ticket, FileText, HelpCircle },
  setup() {
    return {};
  },
  template: `
  <div class="space-y-6">
    
    <!-- Consultant / QR Code -->
    <div class="bg-white rounded-2xl p-6 shadow-card border border-slate-100/50 text-center">
        <div class="flex items-center gap-2 mb-6 border-l-4 border-primary-500 pl-3 text-left">
           <h3 class="text-base font-bold text-slate-800">专属顾问</h3>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl inline-block mb-3 border border-slate-100">
             <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=HawkingEduSupport" class="w-32 h-32 opacity-90 mix-blend-multiply" />
        </div>
        <p class="text-xs text-slate-500">扫码添加，一对一沟通服务</p>
    </div>

    <!-- Featured Functions -->
    <div class="bg-white rounded-2xl p-6 shadow-card border border-slate-100/50">
        <div class="flex items-center gap-2 mb-4 border-l-4 border-primary-500 pl-3">
           <h3 class="text-base font-bold text-slate-800">特色功能</h3>
        </div>
        
        <div class="divide-y divide-slate-50">
            <div class="py-3 flex gap-3 group cursor-pointer">
                <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <ShieldCheck class="w-4 h-4" />
                </div>
                <div>
                    <div class="flex items-center gap-2 mb-0.5">
                        <span class="text-sm font-bold text-slate-700 group-hover:text-primary-600">内容防盗</span>
                        <span class="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">限时免费</span>
                    </div>
                    <p class="text-xs text-slate-400">防录屏，防截屏，安心保护，即可拥有</p>
                </div>
            </div>

             <div class="py-3 flex gap-3 group cursor-pointer">
                <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Video class="w-4 h-4" />
                </div>
                <div>
                    <div class="flex items-center gap-2 mb-0.5">
                        <span class="text-sm font-bold text-slate-700 group-hover:text-primary-600">高清授课</span>
                        <span class="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">限时免费</span>
                    </div>
                    <p class="text-xs text-slate-400">高清授课学习，视觉新体验</p>
                </div>
            </div>

            <div class="py-3 flex gap-3 group cursor-pointer">
                <div class="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <Cloud class="w-4 h-4" />
                </div>
                <div>
                    <div class="flex items-center gap-2 mb-0.5">
                        <span class="text-sm font-bold text-slate-700 group-hover:text-primary-600">大空间</span>
                        <span class="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">免费送</span>
                    </div>
                    <p class="text-xs text-slate-400">入驻送 200G 存储空间</p>
                </div>
            </div>

            <div class="py-3 flex gap-3 group cursor-pointer">
                <div class="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Ticket class="w-4 h-4" />
                </div>
                <div>
                    <div class="flex items-center gap-2 mb-0.5">
                        <span class="text-sm font-bold text-slate-700 group-hover:text-primary-600">营销工具</span>
                        <span class="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">终身免费</span>
                    </div>
                    <p class="text-xs text-slate-400">拼团、优惠券、限时优惠、课程联报</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Service Terms -->
    <div class="bg-white rounded-2xl p-6 shadow-card border border-slate-100/50">
        <div class="flex items-center gap-2 mb-4 border-l-4 border-primary-500 pl-3">
           <h3 class="text-base font-bold text-slate-800">服务条例</h3>
        </div>
        <ul class="space-y-3">
            <li class="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 cursor-pointer transition-colors">
                <span class="w-1 h-1 rounded-full bg-slate-300"></span>
                服务协议
            </li>
             <li class="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 cursor-pointer transition-colors">
                <span class="w-1 h-1 rounded-full bg-slate-300"></span>
                帮助中心
            </li>
        </ul>
    </div>

  </div>
  `
});