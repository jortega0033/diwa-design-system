'use client';

import React from 'react';
import { Playground } from '@/components/playground/Playground';
import type { FrameworkCode } from '@/models/framework';

function BannerToggleExample({
  heading,
  description,
  state,
  actionLabel,
  persistent,
  dismissButton,
  duration,
  buttonLabel,
}: {
  heading: string;
  description: string;
  state: 'info' | 'success' | 'warning' | 'error';
  actionLabel?: string;
  persistent?: boolean;
  dismissButton?: boolean;
  duration?: number;
  buttonLabel: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <diwa-button-pure icon={open ? 'x' : 'chevron-right'} color="secondary" onClick={() => setOpen((v) => !v)}>
        {open ? 'Hide Banner' : buttonLabel}
      </diwa-button-pure>

      <diwa-banner
        open={open}
        state={state}
        heading={heading}
        description={description}
        actionLabel={actionLabel}
        persistent={persistent ?? false}
        dismissButton={dismissButton ?? true}
        duration={duration ?? 6000}
        ondismiss={() => setOpen(false)}
        style={{ '--diwa-banner-position-top': '90px' } as React.CSSProperties}
      />
    </div>
  );
}

const toggleCode: FrameworkCode = {
  html: `<diwa-button-pure id="open-banner">Open Banner</diwa-button-pure>
<diwa-banner id="banner" state="info" heading="Some heading" description="Some description."></diwa-banner>

<script>
  const button = document.getElementById('open-banner');
  const banner = document.getElementById('banner');
  button.addEventListener('click', () => (banner.open = !banner.open));
  banner.addEventListener('dismiss', () => (banner.open = false));
</script>`,
  react: `const [open, setOpen] = useState(false);

<DiwaButtonPure onClick={() => setOpen(v => !v)}>{open ? 'Hide Banner' : 'Open Banner'}</DiwaButtonPure>
<DiwaBanner open={open} state="info" heading="Some heading" description="Some description." onDismiss={() => setOpen(false)} />`,
  angular: `open = false;

<diwa-button-pure (click)="open = !open">{{ open ? 'Hide Banner' : 'Open Banner' }}</diwa-button-pure>
<diwa-banner [open]="open" state="info" heading="Some heading" description="Some description." (dismiss)="open = false"></diwa-banner>`,
  vue: `const open = ref(false);

<diwa-button-pure @click="open = !open">{{ open ? 'Hide Banner' : 'Open Banner' }}</diwa-button-pure>
<diwa-banner :open="open" state="info" heading="Some heading" description="Some description." @dismiss="open = false"></diwa-banner>`,
};

export default function BannerExamplesPage() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">All states</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Each example starts closed and is opened explicitly by a button, matching production behavior patterns.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Playground frameworkCode={toggleCode}>
            <BannerToggleExample
              buttonLabel="Open Info Banner"
              state="info"
              heading="System maintenance window"
              description="Maintenance starts at 10:00 PM. Some services may be temporarily unavailable."
              persistent
            />
          </Playground>
          <Playground frameworkCode={toggleCode}>
            <BannerToggleExample
              buttonLabel="Open Success Banner"
              state="success"
              heading="Workspace synced"
              description="All pending changes have been successfully synced."
              persistent
            />
          </Playground>
          <Playground frameworkCode={toggleCode}>
            <BannerToggleExample
              buttonLabel="Open Warning Banner"
              state="warning"
              heading="Subscription expires soon"
              description="Your subscription ends in 3 days. Renew now to avoid interruption."
              persistent
            />
          </Playground>
          <Playground frameworkCode={toggleCode}>
            <BannerToggleExample
              buttonLabel="Open Error Banner"
              state="error"
              heading="Payment failed"
              description="We could not process your payment. Update billing details to continue service."
              persistent
            />
          </Playground>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">With action + dismiss</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Use action + dismiss when users need an immediate next step.
        </p>
        <Playground frameworkCode={toggleCode}>
          <BannerToggleExample
            buttonLabel="Open Action Banner"
            state="warning"
            heading="Session expires in 5 minutes"
            description="Save your draft or extend the current session now."
            actionLabel="Extend session"
            persistent
          />
        </Playground>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Timed banner</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Timed banners open on demand and auto-close after the configured duration.
        </p>
        <Playground frameworkCode={toggleCode}>
          <BannerToggleExample
            buttonLabel="Open Timed Banner"
            state="success"
            heading="Settings saved"
            description="Your preferences were updated. This banner auto-dismisses after 3 seconds."
            duration={3000}
          />
        </Playground>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Persistent banner</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Persistent banners remain visible until dismissed or manually closed.
        </p>
        <Playground frameworkCode={toggleCode}>
          <BannerToggleExample
            buttonLabel="Open Persistent Banner"
            state="info"
            heading="Read-only mode"
            description="This project is read-only for your role. Contact an admin to request edit access."
            persistent
            dismissButton={false}
          />
        </Playground>
      </section>
    </div>
  );
}
