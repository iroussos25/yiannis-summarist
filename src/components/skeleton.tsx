
import styles from "./skeleton.module.css"
    
    export default function Skeleton({ width, height, borderRadius }:{
    width: string;
    height: string;
    borderRadius?: string
} ) {
    return (
        <div className={styles.skeleton}
        style={{width, height, borderRadius: borderRadius || "4px" }}></div>
    );
}