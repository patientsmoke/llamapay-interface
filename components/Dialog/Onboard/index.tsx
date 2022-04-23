import * as React from 'react';
import { DisclosureState } from 'ariakit';
import { Dialog } from 'ariakit/dialog';
import classNames from 'classnames';
import { useAccount, useConnect } from 'wagmi';
import { Coins } from 'components/Icons';
import ConnectWallet from './ConnectWallet';
import DepositField from './DepostField';
import CreateStreamField from './CreateStreamField';

interface IOnboardProps {
  dialog: DisclosureState;
  className?: string;
}

export function OnboardDialog({ dialog, className }: IOnboardProps) {
  const [{ loading: connecting }] = useConnect();

  const [{ data: accountData, loading: accountDataLoading }] = useAccount();

  const [showCreateStream, setCreateStream] = React.useState(false);

  const mainHeader = () => {
    if (accountData) {
      return showCreateStream ? 'Create a new Stream' : 'Deposit Token';
    } else if (connecting || accountDataLoading) {
      return 'Initializing';
    } else {
      return 'Connect your wallet';
    }
  };

  const SideContent = () => {
    if (accountData) {
      return (
        <>
          <Coins />
          <h1 className="font-exo my-6 font-bold text-[#303030]">Works with all tokens</h1>
          <p className="text-xs" style={{ lineHeight: '22px' }}>
            Create streams of indefinite duration and just siphon money out of a pool, which makes it possible to top
            all streams up in a single operation and just provide money as it's needed to maintain them.
          </p>
        </>
      );
    }

    return (
      <>
        <h1 className="font-exo text-[2rem] font-bold text-[#303030]">Welcome!</h1>
        <p className="my-8 text-xs font-semibold" style={{ lineHeight: '22px' }}>
          Create streams of indefinite duration and just siphon money out of a pool, which makes it possible to top all
          streams up in a single operation and just provide money as it's needed to maintain them.
        </p>
      </>
    );
  };

  if (!dialog.mounted && showCreateStream) {
    setCreateStream(false);
  }

  return (
    <Dialog
      state={dialog}
      className={classNames(
        'border-color[#EAEAEA] absolute top-8 left-4 right-4 bottom-8 z-50 m-auto mx-auto mt-auto flex max-h-[80vh] max-w-3xl flex-col overflow-auto rounded-2xl border bg-white shadow-[0px_0px_9px_-2px_rgba(0,0,0,0.16)] sm:left-8 sm:right-8 sm:flex-row',
        className
      )}
      id="onboard-form"
    >
      <section className="border-color[#EAEAEA] relative flex w-full flex-col justify-center bg-[#F9FDFB] p-7 sm:max-w-[16rem] sm:border-r">
        <button onClick={dialog.toggle} className="absolute top-4 right-4 sm:hidden">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
              fill="#4E575F"
            />
          </svg>
        </button>
        <SideContent />
        <a
          className="bottom-7 mt-7 text-xs underline md:absolute"
          href="https://docs.llamapay.io/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Learn More in our Docs
        </a>
      </section>
      <section className="relative flex flex-1 flex-col md:overflow-clip">
        <div
          style={{
            position: 'absolute',
            background: 'linear-gradient(210deg, #D9F4E6 13.39%, rgba(255, 255, 255, 0) 75.41%)',
            transform: 'rotate(234deg)',
            width: '1000px',
            height: '1000px',
            left: '-500px',
            top: '-690px',
            zIndex: '-10',
            borderRadius: '1000px',
          }}
          className="hidden md:block"
        ></div>

        <header className="border-color[#EAEAEA] z-10 flex items-baseline p-5 sm:border-b">
          <h1 className="font-exo flex-1 text-center text-2xl font-semibold">{mainHeader()}</h1>
          <button onClick={dialog.toggle} className="absolute top-[30px] right-[30px] hidden sm:inline">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                fill="#4E575F"
              />
            </svg>
          </button>
        </header>

        {accountData ? (
          <>
            {showCreateStream ? (
              <CreateStreamField setCreateStream={setCreateStream} tokens={[]} />
            ) : (
              <DepositField userAddress={accountData.address} setCreateStream={setCreateStream} />
            )}
          </>
        ) : (
          <ConnectWallet />
        )}
      </section>
    </Dialog>
  );
}
