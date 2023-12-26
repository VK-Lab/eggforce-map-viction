import React from 'react';
import cn from 'classnames';
import { useTrail } from 'react-spring';
import BoxInfo from '@/components/BoxInfo';

export type DragonTrait = {
  trait_type: string;
  value: string;
};

export type TraitSpec = {
  'body-elemental': string;
  'mouth-elemental': string;
  'mane-elemental': string;
  eyes: string;
  nose: string;
  fangs: string;
};

export const traitsMapper: TraitSpec = {
  'body-elemental': 'Body',
  'mouth-elemental': 'Mouth',
  'mane-elemental': 'Mane',
  eyes: 'Eyes',
  nose: 'Nose',
  fangs: 'Fangs',
};

const DragonAttributes = ({
  traits,
  show = false,
}: {
  traits: DragonTrait[];
  show?: boolean;
}) => {
  const trails = useTrail(traits.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: show ? 1 : 0,
    x: show ? 0 : 20,
    from: { opacity: 0, x: 20 },
  });
  return (
    <React.Fragment>
      {trails.map((style, index: number) => {
        const trait = traits[index] as DragonTrait;
        return (
          <BoxInfo
            style={style}
            key={trait.value}
            className={cn(`traits-values trait--${trait.trait_type}`, {
              'long-value': Boolean(trait.value.length > 15),
            })}
            label={traitsMapper[trait.trait_type as keyof TraitSpec]}
            value={trait.value}
            isHorizontal={false}
            useAnimated
          />
        );
      })}
    </React.Fragment>
  );
};

export default DragonAttributes;
