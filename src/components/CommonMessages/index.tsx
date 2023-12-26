import imgCSPR from '@/assets/images/logo--cspr-live.svg';

const MessageSuccess = (
  <span>
    NFT deploy is now being processed. Please note this can take a few moments.
    To check the status of the deploy process simply tap{' '}
    <img className="icon--cspr" src={imgCSPR} alt="Check NFT deploy" />, placed
    at the bottom left.
  </span>
);

const MessageSentSuccess = (
  <span>
    Successfully sent data. Selvynn has been notified, you can safely close
    this.
  </span>
);

const MessageSentEmailSuccess = (
  <span>
    You're almost ready now, just check your mailbox and follow instructions.
    <br /> Need a hand? Join us on{' '}
    <a
      rel="nofollow noopener noreferrer"
      target="_blank"
      style={{ color: '#FFB356' }}
      href="https://discord.com/invite/vCURDNzjYc"
    >
      Discord
    </a>
    . Good luck with incubating.
  </span>
);

const MessageInfo = (
  <span>
    Good day from Selvyn, we'll contact via your provided social media. Enjoy
    your incubating journey.
  </span>
);

const MessageFailed = (
  <span>
    No worries, it's on us and we've been notified. Truly sorry for this
    inconvenience.
  </span>
);

const CommonMessage = () => {
  return null;
};

CommonMessage.Success = MessageSuccess;
CommonMessage.SentSuccess = MessageSentSuccess;
CommonMessage.SentEmailSuccess = MessageSentEmailSuccess;
CommonMessage.Failed = MessageFailed;
CommonMessage.Info = MessageInfo;

export default CommonMessage;
