import cn from 'classnames';
interface NFTMetadataBoxProps {
  className?: string;
  valueClassname?: string;
  labelClassname?: string;
  iconClassname?: string;
  label?: string;
  children: React.ReactNode;
}

const NFTMetadataBox = ({
  className,
  iconClassname,
  valueClassname,
  labelClassname,
  label,
  children,
}: NFTMetadataBoxProps) => {
  return (
    <div className={cn('item', className)}>
      <span className={cn('value', valueClassname)}>{children}</span>
      <div className={cn('label', labelClassname)}>{label}</div>
    </div>
  );
};

export default NFTMetadataBox;
