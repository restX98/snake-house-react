"use client";

function BoxContainer({ children }) {
  return (
    <div className="absolute left-0 top-0 size-full max-h-screen max-w-full overflow-hidden">
      <div className="container mx-auto flex h-full items-center justify-center px-4 [&>*]:relative [&>*]:z-10">
        {children}
      </div>
    </div>
  );
}

export default BoxContainer;
