import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/base/button';
import { ButtonGroup } from '@/components/ui/base/button-group';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  List,
  ListOrdered,
  Indent,
  Outdent
} from 'lucide-react';

const meta = {
  title: 'Base/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultButtons = () => (
  <>
    <Button variant="outline" size="sm">Option 1</Button>
    <Button variant="outline" size="sm">Option 2</Button>
    <Button variant="outline" size="sm">Option 3</Button>
  </>
);

export const Default: Story = {
  args: {
    children: <DefaultButtons />,
  },
};

const SizesExample = () => (
  <div className="flex flex-col gap-4">
    <ButtonGroup size="sm">
      <Button variant="outline" size="sm">Small 1</Button>
      <Button variant="outline" size="sm">Small 2</Button>
      <Button variant="outline" size="sm">Small 3</Button>
    </ButtonGroup>

    <ButtonGroup size="md">
      <Button variant="outline">Medium 1</Button>
      <Button variant="outline">Medium 2</Button>
      <Button variant="outline">Medium 3</Button>
    </ButtonGroup>
  </div>
);

export const Sizes: Story = {
  args: {
    children: <SizesExample />,
  },
};

const ButtonVariantsExample = () => (
  <div className="flex flex-col gap-4">
    <ButtonGroup>
      <Button variant="outline" size="sm">Outline</Button>
      <Button variant="outline" size="sm">Outline</Button>
      <Button variant="outline" size="sm">Outline</Button>
    </ButtonGroup>

    <ButtonGroup>
      <Button variant="default" size="sm">Default</Button>
      <Button variant="default" size="sm">Default</Button>
      <Button variant="default" size="sm">Default</Button>
    </ButtonGroup>

    <ButtonGroup>
      <Button variant="secondary" size="sm">Secondary</Button>
      <Button variant="secondary" size="sm">Secondary</Button>
      <Button variant="secondary" size="sm">Secondary</Button>
    </ButtonGroup>
  </div>
);

export const WithButtonVariants: Story = {
  args: {
    children: <ButtonVariantsExample />,
  },
};

const ToolbarExample = () => (
  <div className="flex flex-wrap gap-2">
    {/* Text formatting */}
    <ButtonGroup size="sm">
      <Button variant="outline" size="sm-icon" tooltip="Bold">
        <Bold />
      </Button>
      <Button variant="outline" size="sm-icon" tooltip="Italic">
        <Italic />
      </Button>
      <Button variant="outline" size="sm-icon" tooltip="Underline">
        <Underline />
      </Button>
    </ButtonGroup>

    {/* Alignment */}
    <ButtonGroup size="sm">
      <Button variant="outline" size="sm-icon" tooltip="Align Left">
        <AlignLeft />
      </Button>
      <Button variant="outline" size="sm-icon" tooltip="Align Center">
        <AlignCenter />
      </Button>
      <Button variant="outline" size="sm-icon" tooltip="Align Right">
        <AlignRight />
      </Button>
      <Button variant="outline" size="sm-icon" tooltip="Justify">
        <AlignJustify />
      </Button>
    </ButtonGroup>

    {/* Lists and Indentation */}
    <ButtonGroup size="sm">
      <Button variant="outline" size="sm-icon" tooltip="Bullet List">
        <List />
      </Button>
      <Button variant="outline" size="sm-icon" tooltip="Numbered List">
        <ListOrdered />
      </Button>
      <Button variant="outline" size="sm-icon" tooltip="Decrease Indent">
        <Outdent />
      </Button>
      <Button variant="outline" size="sm-icon" tooltip="Increase Indent">
        <Indent />
      </Button>
    </ButtonGroup>
  </div>
);

export const AsToolbar: Story = {
  args: {
    children: <ToolbarExample />,
  },
}; 