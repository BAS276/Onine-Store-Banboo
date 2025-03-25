import { useEffect, useRef } from "react";
import "../style/infiniteScroll.css";
import apple from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/marklogo/apple.png"
import dell from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/marklogo/dell.png"
import hp from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/marklogo/hp.png"
import huawei from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/marklogo/huawei.png"
import samsung from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/marklogo/samsung.png"
import sony from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/marklogo/sony.png"
import xbox from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/marklogo/xbox-.png"
import logitech from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/marklogo/logitech.png"
import lenovo from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/marklogo/lenovo.png"
import xiaomi from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/marklogo/xiaomi.png"
import oppo from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/marklogo/oppo.png"
import intel from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/marklogo/intel.png"
import nvidia from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/marklogo/nvidia.png"
import amd from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/marklogo/amd.png"

const InfiniteScrollLogos = () => {
  const logosRef = useRef(null);

  useEffect(() => {
    if (logosRef.current) {
      const clonedLogos = logosRef.current.cloneNode(true);
      clonedLogos.setAttribute("aria-hidden", "true");
      logosRef.current.parentNode.appendChild(clonedLogos);
    }
  }, []);

  return (
    <div className="scroll-container">
      <ul ref={logosRef} className="logos-list">
      <li><img src={apple} alt="apple" /></li>
        <li><img src={dell} alt="Disney" /></li>
        <li><img src={hp} alt="Airbnb" /></li>
        <li><img src={huawei} alt="Apple" /></li>
        <li><img src={samsung} alt="Spark" /></li>
        <li><img src={sony} alt="Samsung" /></li>
        <li><img src={xbox} alt="Quora" /></li>
        <li><img src={logitech} alt="Quora" /></li>
        <li><img src={lenovo} alt="Quora" /></li>
        <li><img src={xiaomi} alt="Quora" /></li>
        <li><img src={oppo} alt="Quora" /></li>
        <li><img src={intel} alt="Quora" /></li>
        <li><img src={nvidia} alt="Quora" /></li>
        <li><img src={amd} alt="Quora" /></li>
      </ul>
    </div>
  );
};

export default InfiniteScrollLogos;
