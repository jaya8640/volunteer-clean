<button title="Add Record" onclick="window.location.href = '{{ url(config('app.admin_prefix') . '/' . $target) }}'"
    {{-- x-tooltip.placement.left.primary="'Add Record'" --}}
    class="h-10 w-10 bg-gradient-to-br btn rounded-0 from-purple-500 to-indigo-600 hover:rotate-[360deg] font-medium text-white fixed z-50 bottom-10 right-8 animate-bounce " >
     <i class="fa fa-plus transition-transform duration-500 ease-in-out"></i>
</button>
