import styles from "./skeleton.module.css"

export default function Skeleton({ 
  width, 
  height, 
  borderRadius, 
  marginBottom 
}: {
  width: string;
  height: string;
  borderRadius?: string;
  marginBottom?: string;
}) {
  return (
    <div 
      className={styles.skeleton}
      style={{
        width, 
        height, 
        borderRadius: borderRadius, 
        marginBottom: marginBottom || "0px" 
      }}
    ></div>
  );
}
