import styleSystemReq from "../../../scss/modules/pages/game/SystemReq.module.scss";

export default function SystemReq({ sysReq }) {

  if (!sysReq) return;

  const minSysReq = sysReq.filter((req) => req.type.toLowerCase() === "minimum");
  const recSysReq = sysReq.filter((req) => req.type.toLowerCase() === "recommended");

  function isReqEmpty() {
    const gameSystemRequirements = sysReq;
    let isReqEmpty = true;
    gameSystemRequirements.forEach(gsr => {
      if (gsr.so !== "" ||
        gsr.storage !== "" ||
        gsr.cpu !== "" ||
        gsr.memory !== "" ||
        gsr.gpu !== "" ||
        gsr.directx !== "" ||
        gsr.internet !== "" ||
        gsr.other !== "") {
        isReqEmpty = false;
      }
    })
    return isReqEmpty;
  }

  if (!isReqEmpty())
  return (
    <div className={`${styleSystemReq.container}`}>
      <h3>System Requirements</h3>
      <div className={`${styleSystemReq.grid}`}>
        <div className={`${styleSystemReq["grid-item-min"]}`}>
          <h5>Minimum</h5>
          {minSysReq[0]?.so ? <p><strong>SO: </strong>{minSysReq[0].so}</p> : ""}
          {minSysReq[0]?.storage ? <p><strong>Storage: </strong>{minSysReq[0].storage}</p> : ""}
          {minSysReq[0]?.cpu ? <p><strong>CPU: </strong>{minSysReq[0].cpu}</p> : ""}
          {minSysReq[0]?.ram ? <p><strong>RAM: </strong>{minSysReq[0].ram}</p> : ""}
          {minSysReq[0]?.gpu ? <p><strong>GPU: </strong>{minSysReq[0].gpu}</p> : ""}
          {minSysReq[0]?.internet ? <p><strong>Network: </strong>{minSysReq[0].internet}</p> : ""}
          {minSysReq[0]?.other ? <p><strong>Other: </strong>{minSysReq[0].other}</p> : ""}
        </div>
        <div className={`${styleSystemReq["grid-item-rec"]}`}>
          <h5>Recommended</h5>
          {recSysReq[0]?.so ? <p><strong>SO: </strong>{recSysReq[0].so}</p> : ""}
          {recSysReq[0]?.storage ? <p><strong>Storage: </strong>{recSysReq[0].storage}</p> : ""}
          {recSysReq[0]?.cpu ? <p><strong>CPU: </strong>{recSysReq[0].cpu}</p> : ""}
          {recSysReq[0]?.ram ? <p><strong>RAM: </strong>{recSysReq[0].ram}</p> : ""}
          {recSysReq[0]?.gpu ? <p><strong>GPU: </strong>{recSysReq[0].gpu}</p> : ""}
          {recSysReq[0]?.internet ? <p><strong>Network: </strong>{recSysReq[0].internet}</p> : ""}
          {recSysReq[0]?.other ? <p><strong>Other: </strong>{recSysReq[0].other}</p> : ""}
        </div>
      </div>
    </div>
  );

}