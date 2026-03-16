import { createSignal } from 'solid-js';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { 
  ICON_DOCUMENT_TEXT, ICON_ENVELOPE, ICON_LOCK_CLOSED, 
  ICON_X_MARK, ICON_IDENTIFICATION, ICON_HASHTAG 
} from '~/lib/icons';
import { TextField } from '~/components/input/TextField';
import { ComponentViewer } from '~/components/content/ComponentViewer';

export default function TextFieldPage() {
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [emailError, setEmailError] = createSignal("");
  const [pass, setPass] = createSignal("");
  const [minVal, setMinVal] = createSignal("");
  const [minError, setMinError] = createSignal("");
  const [maxVal, setMaxVal] = createSignal("");
  const [maxError, setMaxError] = createSignal("");
  const [bothVal, setBothVal] = createSignal("");
  const [bothError, setBothError] = createSignal("");
  const [refId, setRefId] = createSignal("");
  const [refError, setRefError] = createSignal("");

  const validateEmail = () => {
    const value = email();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validateMin = () => {
    if (minVal().length < 3) setMinError("Minimum 3 characters");
    else setMinError("");
  };

  const validateMax = () => {
    if (maxVal().length > 10) setMaxError("Maximum 10 characters");
    else setMaxError("");
  };

  const validateBoth = () => {
    const len = bothVal().length;
    if (len < 5) setBothError("Minimum 5 characters");
    else if (len > 15) setBothError("Maximum 15 characters");
    else setBothError("");
  };

  const validateRefId = () => {
    const value = refId();
    const pattern = /^[A-Z]{3}-\d{4}$/;
    if (!pattern.test(value)) {
      setRefError("Format must be AAA-0000");
    } else {
      setRefError("");
    }
  };

  const handleEmailKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') validateEmail();
  };

  const handleMinKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') validateMin();
  };

  const handleMaxKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') validateMax();
  };

  const handleBothKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') validateBoth();
  };

  const handleRefKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') validateRefId();
  };

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_DOCUMENT_TEXT} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Text Field</HeadingText>
      </div>

      <div class="flex flex-col gap-6 md:gap-8 pb-12">
        <ComponentViewer 
          title="Basic Input"
          icon={<Icon icon={ICON_DOCUMENT_TEXT} />}
          description="Standard text input with a label and placeholder."
          code={`
<TextField 
  label="Full Name"
  placeholder="Enter your name"
  value={name()}
  onChange={setName}
/>
          `}
        >
          <TextField 
            label="Full Name"
            placeholder="John Doe"
            value={name()}
            onChange={setName}
            class="w-full max-w-sm"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Email Input"
          icon={<Icon icon={ICON_ENVELOPE} />}
          description="Specific input type for email addresses with built-in validation support."
          code={`
<TextField 
  type="email"
  label="Email"
  placeholder="name@example.com"
  value={email()}
  onChange={setEmail}
  error={emailError()}
/>
          `}
        >
          <TextField 
            type="email"
            label="Email Address"
            placeholder="name@example.com"
            value={email()}
            onChange={setEmail}
            error={emailError()}
            onKeyDown={handleEmailKeyDown}
            class="w-full max-w-sm"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Character Limits"
          icon={<Icon icon={ICON_IDENTIFICATION} />}
          description="Enforce minimum or maximum character counts for input values."
          code={`
<TextField 
  label="Username"
  minLength={3}
  maxLength={10}
/>
          `}
        >
          <div class="flex flex-col gap-6 w-full max-w-sm">
            <TextField 
              label="Minimum Length (Min: 3)"
              placeholder="At least 3 characters"
              value={minVal()}
              onChange={setMinVal}
              error={minError()}
              onKeyDown={handleMinKeyDown}
              minLength={3}
              class="w-full"
            />

            <TextField 
              label="Maximum Length (Max: 10)"
              placeholder="Up to 10 characters"
              value={maxVal()}
              onChange={setMaxVal}
              error={maxError()}
              onKeyDown={handleMaxKeyDown}
              maxLength={10}
              class="w-full"
            />

            <TextField 
              label="Range (5 to 15)"
              placeholder="Between 5 and 15 characters"
              value={bothVal()}
              onChange={setBothVal}
              error={bothError()}
              onKeyDown={handleBothKeyDown}
              minLength={5}
              maxLength={15}
              class="w-full"
            />
          </div>
        </ComponentViewer>

        <ComponentViewer 
          title="Pattern Matching"
          icon={<Icon icon={ICON_HASHTAG} />}
          description="Validate input using regular expressions for specific formats."
          code={`
<TextField 
  label="Order Code (AAA-0000)"
  pattern="[A-Z]{3}-\\d{4}"
/>
          `}
        >
          <TextField 
            label="Order Code (AAA-0000)"
            value={refId()}
            onChange={setRefId}
            error={refError()}
            onKeyDown={handleRefKeyDown}
            pattern="[A-Z]{3}-\d{4}"
            class="w-full max-w-sm"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Password Input"
          icon={<Icon icon={ICON_LOCK_CLOSED} />}
          description="Masked input for passwords and sensitive information."
          code={`
<TextField 
  type="password"
  label="Password"
  placeholder="Enter your password"
  value={pass()}
  onChange={setPass}
/>
          `}
        >
          <TextField 
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={pass()}
            onChange={setPass}
            class="w-full max-w-sm"
          />
        </ComponentViewer>

        <ComponentViewer 
          title="Disabled State"
          icon={<Icon icon={ICON_X_MARK} />}
          description="Prevent user interaction for read-only or inactive fields."
          code={`
<TextField 
  label="User ID"
  value="USR-12345"
  disabled={true}
/>
          `}
        >
          <TextField 
            label="User ID"
            value="USR-12345"
            disabled={true}
            class="w-full max-w-sm"
          />
        </ComponentViewer>
      </div>
    </PageWrapper>
  );
}
