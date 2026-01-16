import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Plus, Trash2, Upload, Image as ImageIcon, Type, MoveUp, MoveDown } from "lucide-react";

export type ContentBlock = {
  id: string;
  type: 'text' | 'image';
  content: string;
};

interface BlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

export function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const [uploadingBlockId, setUploadingBlockId] = useState<string | null>(null);

  const addTextBlock = () => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type: 'text',
      content: ''
    };
    onChange([...blocks, newBlock]);
  };

  const addImageBlock = () => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type: 'image',
      content: ''
    };
    onChange([...blocks, newBlock]);
  };

  const updateBlock = (id: string, content: string) => {
    onChange(blocks.map(block => 
      block.id === id ? { ...block, content } : block
    ));
  };

  const deleteBlock = (id: string) => {
    onChange(blocks.filter(block => block.id !== id));
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(block => block.id === id);
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === blocks.length - 1)
    ) {
      return;
    }

    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    onChange(newBlocks);
  };

  const handleImageUpload = (blockId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      
      setUploadingBlockId(blockId);
      const reader = new FileReader();
      reader.onloadend = () => {
        updateBlock(blockId, reader.result as string);
        setUploadingBlockId(null);
        e.target.value = "";
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-[#0F4C5C]">Project Content (Behance-style blocks)</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={addTextBlock}
            size="sm"
            className="bg-[#6B8E9E] hover:bg-[#6B8E9E]/90 text-white"
          >
            <Type className="size-4 mr-2" />
            Add Text
          </Button>
          <Button
            type="button"
            onClick={addImageBlock}
            size="sm"
            className="bg-[#6B8E9E] hover:bg-[#6B8E9E]/90 text-white"
          >
            <ImageIcon className="size-4 mr-2" />
            Add Image
          </Button>
        </div>
      </div>

      {blocks.length === 0 && (
        <Card className="p-8 text-center bg-[#E0A63F]/5 border-dashed border-2 border-[#E0A63F]/30">
          <p className="text-[#6B8E9E] mb-4">No content blocks yet. Start by adding text or images!</p>
          <div className="flex gap-2 justify-center">
            <Button
              type="button"
              onClick={addTextBlock}
              variant="outline"
              className="border-[#6B8E9E] text-[#6B8E9E]"
            >
              <Type className="size-4 mr-2" />
              Add Text Block
            </Button>
            <Button
              type="button"
              onClick={addImageBlock}
              variant="outline"
              className="border-[#6B8E9E] text-[#6B8E9E]"
            >
              <ImageIcon className="size-4 mr-2" />
              Add Image Block
            </Button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {blocks.map((block, index) => (
          <Card key={block.id} className="p-4 bg-white border-[#6B8E9E]/20">
            <div className="flex items-start gap-3">
              {/* Block Type Indicator */}
              <div className="flex-shrink-0 mt-2">
                <div className={`w-8 h-8 rounded flex items-center justify-center ${
                  block.type === 'text' 
                    ? 'bg-[#E0A63F]/20 text-[#E0A63F]' 
                    : 'bg-[#6B8E9E]/20 text-[#6B8E9E]'
                }`}>
                  {block.type === 'text' ? <Type className="size-4" /> : <ImageIcon className="size-4" />}
                </div>
              </div>

              {/* Block Content */}
              <div className="flex-1 min-w-0">
                {block.type === 'text' ? (
                  <Textarea
                    value={block.content}
                    onChange={(e) => updateBlock(block.id, e.target.value)}
                    placeholder="Enter your text here... You can write multiple paragraphs."
                    rows={4}
                    className="resize-none"
                  />
                ) : (
                  <div className="space-y-2">
                    {!block.content ? (
                      <div className="border-2 border-dashed border-[#6B8E9E]/30 rounded-lg p-6 text-center">
                        <Label 
                          htmlFor={`image-upload-${block.id}`}
                          className="cursor-pointer inline-flex flex-col items-center gap-2"
                        >
                          <div className="w-12 h-12 rounded-full bg-[#6B8E9E]/10 flex items-center justify-center">
                            <Upload className="size-6 text-[#6B8E9E]" />
                          </div>
                          <span className="text-[#6B8E9E]">
                            {uploadingBlockId === block.id ? "Uploading..." : "Click to upload image"}
                          </span>
                          <span className="text-xs text-[#6B8E9E]/70">Max 5MB</span>
                        </Label>
                        <Input
                          id={`image-upload-${block.id}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(block.id, e)}
                          className="hidden"
                          disabled={uploadingBlockId === block.id}
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <img 
                          src={block.content} 
                          alt="Block content" 
                          className="w-full rounded-lg border border-[#6B8E9E]/30"
                          style={{ maxHeight: '400px', objectFit: 'contain' }}
                        />
                        <Button
                          type="button"
                          onClick={() => updateBlock(block.id, '')}
                          variant="outline"
                          size="sm"
                          className="w-full border-[#6B8E9E] text-[#6B8E9E]"
                        >
                          <Upload className="size-4 mr-2" />
                          Replace Image
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Block Actions */}
              <div className="flex flex-col gap-1 flex-shrink-0">
                <Button
                  type="button"
                  onClick={() => moveBlock(block.id, 'up')}
                  disabled={index === 0}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-[#6B8E9E] hover:bg-[#6B8E9E]/10"
                  aria-label="Move up"
                >
                  <MoveUp className="size-4" />
                </Button>
                <Button
                  type="button"
                  onClick={() => moveBlock(block.id, 'down')}
                  disabled={index === blocks.length - 1}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-[#6B8E9E] hover:bg-[#6B8E9E]/10"
                  aria-label="Move down"
                >
                  <MoveDown className="size-4" />
                </Button>
                <Button
                  type="button"
                  onClick={() => deleteBlock(block.id)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:bg-red-50"
                  aria-label="Delete block"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {blocks.length > 0 && (
        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            onClick={addTextBlock}
            variant="outline"
            size="sm"
            className="border-[#6B8E9E] text-[#6B8E9E]"
          >
            <Plus className="size-4 mr-2" />
            Add Text Block
          </Button>
          <Button
            type="button"
            onClick={addImageBlock}
            variant="outline"
            size="sm"
            className="border-[#6B8E9E] text-[#6B8E9E]"
          >
            <Plus className="size-4 mr-2" />
            Add Image Block
          </Button>
        </div>
      )}
    </div>
  );
}
