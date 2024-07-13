"use client";

import { Root, Portal, Overlay, Content } from "@radix-ui/react-dialog";

import useMobileMenuModal from "@/hooks/useMobileMenuModal";

const MobileMenuModal = () => {
  const { isOpen, onClose } = useMobileMenuModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Portal>
        <Overlay className="bg-neutral-900/90 fixed inset-0 z-50" />
        <Content
          className="fixed outline-none top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[60] border-none h-[80%]"
        >
          <div
            className="h-full flex flex-col items-center justify-evenly outline-none"
            onClick={() => onChange(false)}
          >
            {
              ["Home", "TV Series", "Movies", "New & Popular", "My List"].map(item=>(
                <p key={item} className="hover:scale-105 hover:text-primary underline-offset-1 transition hover:underline text-sm sm:text-xl shadow-xl cursor-pointer">
                  {item}
                </p>
              ))
            }
          </div>
        </Content>
      </Portal>
    </Root>
  );
};

export default MobileMenuModal;
