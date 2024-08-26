import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const AutoResizeTextarea = forwardRef<HTMLTextAreaElement, AutoResizeTextareaProps>((props, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const adjustHeight = () => {
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.max(textarea.scrollHeight, 55)}px`;
      };

      // 초기 높이 조정
      adjustHeight();

      // 입력할 때마다 높이 조정
      textarea.addEventListener('input', adjustHeight);

      return () => {
        textarea.removeEventListener('input', adjustHeight);
      };
    }
  }, []);

  return (
    <textarea
      ref={textareaRef}
      style={{ minHeight: '55px', overflow: 'hidden' }}
      className='w-full rounded-[10px] border border-gray-c4 bg-white px-[20px] py-[10px] focus:outline-none focus:ring-2 focus:ring-blue-hover'
      {...props}
    />
  );
});

AutoResizeTextarea.displayName = 'AutoResizeTextarea';

export default AutoResizeTextarea;
