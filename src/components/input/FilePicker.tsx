
import { createSignal, Show } from "solid-js";
import { Icon } from "@iconify-icon/solid";
import { ICON_ARROW_DOWN_TRAY, ICON_CHECK, ICON_DOCUMENT_TEXT } from "~/lib/icons";

export interface FilePickerProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  onFilesSelected: (files: FileList) => void;
  class?: string;
}

export function FilePicker(props: FilePickerProps) {
  const [dragActive, setDragActive] = createSignal(false);
  const [selectedFileNames, setSelectedFileNames] = createSignal<string[]>([]);
  let inputRef: HTMLInputElement | undefined;

  const handleFiles = (files: FileList | null) => {
    if (files && files.length > 0) {
      setSelectedFileNames(Array.from(files).map(f => f.name));
      props.onFilesSelected(files);
    }
  };

  const onDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer?.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div class={`flex flex-col gap-2 ${props.class || ""}`}>
      {props.label && (
        <label class="text-[0.8rem] font-bold text-main ml-1 tracking-wide">{props.label}</label>
      )}
      
      <div
        onDragEnter={onDrag}
        onDragLeave={onDrag}
        onDragOver={onDrag}
        onDrop={onDrop}
        onClick={() => inputRef?.click()}
        class={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden
          ${dragActive() 
            ? 'border-theme bg-theme/5 scale-[1.01]' 
            : 'border-input-border bg-input hover:bg-hover hover:border-theme/40'}`}
        style={{ "box-shadow": "var(--color-input-shadow)" }}
      >
        <input
          ref={inputRef}
          type="file"
          class="hidden"
          multiple={props.multiple}
          accept={props.accept}
          onChange={(e) => handleFiles(e.currentTarget.files)}
        />
        
        <div class={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 ${dragActive() ? 'scale-110 bg-theme text-white' : 'bg-theme/10 text-theme'}`}>
          <Icon icon={selectedFileNames().length > 0 ? ICON_CHECK : ICON_ARROW_DOWN_TRAY} width={24} height={24} />
        </div>
        
        <div class="text-center">
          <Show 
            when={selectedFileNames().length > 0} 
            fallback={
              <div class="flex flex-col gap-1">
                <span class="text-sm font-bold text-main">Click or drop files here</span>
                <span class="text-[10px] text-muted font-medium uppercase tracking-tighter">Support for PNG, JPG, PDF up to 10MB</span>
              </div>
            }
          >
            <div class="flex flex-col gap-2">
              <span class="text-sm font-bold text-theme">{selectedFileNames().length} Files Selected</span>
              <div class="flex flex-wrap justify-center gap-1.5 mt-2">
                <Show when={selectedFileNames().length < 4} fallback={<span class="text-[10px] text-muted">{selectedFileNames().length} files...</span>}>
                  {selectedFileNames().map(name => (
                    <div class="flex items-center gap-1.5 px-2 py-1 bg-surface border border-input-border rounded-lg text-[9px] font-bold text-main">
                      <Icon icon={ICON_DOCUMENT_TEXT} class="text-theme" />
                      {name.length > 15 ? name.substring(0, 12) + "..." : name}
                    </div>
                  ))}
                </Show>
              </div>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
}
