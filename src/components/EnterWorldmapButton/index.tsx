import { useState, useEffect, useCallback } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { animated, useSpring } from 'react-spring';
import iconTreeSelvyn from '@/assets/images/icon--treeSelvyn.webp';
import { useWindowScroll } from 'react-use';
import SocialDiscordButton from '@/components/SocialDiscordButton';
import Button from '@/components/GButton';
// import MODULES_PERMISSION from '@/constants/modulesPermission';
// import Button from '@/components/GButton';
// import { useAppDispatch as useDispatch } from '@/app/hooks';
// import { CustomEventModalActions } from '@/modules/CustomEventModule/store';

interface IProps {
  url?: string;
  className?: string;
  rounded?: boolean;
}

const EnterWorldmapButton = ({ rounded = false, className }: IProps) => {
  // const dispatch = useDispatch();

  // if (MODULES_PERMISSION.USE_ADHOC_FORM) {
  //   return (
  //     <Button
  //       onClick={() => {
  //         dispatch(
  //           CustomEventModalActions.setAdHocResultEventModalSrc(
  //             'btn--enter-callista',
  //           ),
  //         );
  //         dispatch(CustomEventModalActions.showAdHocResultEventModal());
  //       }}
  //       className="btn--enter-callista-world ms-lg-2 ms-xl-4 ms-2"
  //     >
  //       <span className="icon">
  //         <img
  //           src={iconTreeSelvyn}
  //           alt={'View on CSPR Explorer'}
  //           className="icon-wallet"
  //         />
  //       </span>
  //       <span className="label">Enter Callista World</span>
  //     </Button>
  //   );
  // }

  return (
    <Nav.Link
      as={NavLink}
      to={'/world'}
      className={cn(
        'btn--enter-callista-world ms-lg-2 ms-xl-4 ms-2',
        {
          rounded: rounded,
        },
        className,
      )}
    >
      <span className="icon">
        <img
          src={iconTreeSelvyn}
          alt={'View on CSPR Explorer'}
          className="icon-wallet"
        />
      </span>
      <span className="label">Enter Callista World</span>
    </Nav.Link>
  );
};

const StickyEnterWorldmapButton = () => {
  const { y } = useWindowScroll();
  const shouldAnimate = Boolean(y <= 500);

  const wrapperStyles = useSpring({
    reset: true,
    to: {
      opacity: shouldAnimate ? 0 : 1,
      transform: shouldAnimate ? `translate(0, 90%)` : `translate(0, 0)`,
    },
  });

  return (
    <animated.div
      style={wrapperStyles}
      className="btn--enter-callista-world--sticky"
    >
      <EnterWorldmapButton rounded />
    </animated.div>
  );
};

const StickyEnterDiscordCommunityButton = () => {
  const { y } = useWindowScroll();
  const shouldAnimate = Boolean(y <= 500);

  const wrapperStyles = useSpring({
    reset: true,
    to: {
      opacity: shouldAnimate ? 0 : 1,
      transform: shouldAnimate ? `translate(0, 90%)` : `translate(0, 0)`,
    },
  });

  return (
    <animated.div
      style={wrapperStyles}
      className="btn--enter-discord-community"
    >
      <SocialDiscordButton />
    </animated.div>
  );
};

const StickySNCRegisterButton = () => {
  const { y } = useWindowScroll();
  const [isVisible, setVisible] = useState<boolean>(false);
  const shouldHide = isVisible || (!isVisible && Boolean(y <= 200));

  const wrapperStyles = useSpring({
    reset: true,
    to: {
      opacity: shouldHide ? 0 : 1,
      transform: shouldHide ? `translate(-50%, 90%)` : `translate(-50%, 0)`,
    },
  });

  const isFormInView = useCallback((y: number) => {
    const element = document.querySelector(
      '#snc-registration-form',
    ) as HTMLElement;
    const { height, bottom } = element.getBoundingClientRect();
    // console.log(`🚀 ~ isFormInView ~ bottom:`, bottom, y);
    return y >= bottom - height;
  }, []);

  const onClickHandler = useCallback(() => {
    const element = document.querySelector(
      '#snc-registration-form',
    ) as HTMLElement;
    const { height } = element.getBoundingClientRect();

    const scrollDiv = element.offsetTop ?? undefined;
    if (scrollDiv) {
      window.scrollTo({ top: scrollDiv - height / 2, behavior: 'smooth' });
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (y <= 150 && isVisible) {
      setVisible(false);
      return;
    }

    if (!isVisible && isFormInView(y)) {
      setVisible(true);
    }
  }, [isFormInView, isVisible, y]);

  return (
    <animated.div
      style={wrapperStyles}
      className="btn--sticky-SNC-register-button"
    >
      <Button
        size="small"
        className="btn--snc-register sticky"
        onClick={onClickHandler}
      >
        Register SNC Airdrop
      </Button>
    </animated.div>
  );
};

export {
  StickySNCRegisterButton,
  StickyEnterDiscordCommunityButton,
  StickyEnterWorldmapButton,
};

export default EnterWorldmapButton;
