type NotificationProps = {
  message: string;
  link: string;
};

const Notification = ({ message, link }: NotificationProps) => (
  <a
    className="safe-paddings relative z-50 flex h-9 w-full items-center justify-center gap-x-2.5 overflow-hidden bg-[#F5FBFD] px-4 py-2.5 leading-none transition-colors duration-200 hover:bg-[#f1fcff] dark:bg-[#0B0C0F] dark:hover:bg-gray-new-8"
    href={link}
  >
    <span className="relative z-50 truncate py-1 font-medium text-gray-new-15 text-sm tracking-extra-tight sm:text-[13px] dark:text-gray-new-90">
      {message} &gt;
    </span>
    <span className="-z-10 -translate-y-[43%] absolute top-1/2 left-1/2 h-[188px] w-[60px] origin-center translate-x-[-290px] rotate-[226deg] rounded-[100%] bg-[linear-gradient(-45deg,_#6DC5D8_40.06%,_#6A77E8_48.11%)] opacity-70 mix-blend-plus-lighter blur-2xl sm:left-[30%] sm:translate-x-0 dark:opacity-100" />
    <span className="-translate-y-[43%] absolute top-1/2 left-1/2 z-0 h-[188px] w-[60px] origin-center translate-x-[-290px] rotate-[226deg] rounded-[100%] bg-[linear-gradient(-45deg,_#6DC5D8_40.06%,_#6A77E8_48.11%)] opacity-100 blur-2xl sm:left-[30%] sm:translate-x-0 dark:hidden" />
    <span className="absolute inset-x-0 bottom-0 z-10 block h-px w-full bg-black-new mix-blend-overlay dark:bg-white" />
  </a>
);

export default Notification;
