import React, { useState, useEffect } from "react";
import LoGo from "../payao.png";
import { useParams } from "react-router";
import axios from "axios";
import BaseUrl from "../api/BaseUrl";
import ReactLoading from "react-loading";
import Barcode from "react-barcode";
import {
  formatYearMonthDayTime,
  formatDayMonthYearTimeThai,
  currentYearMonthDay,
} from "../utils/utils.js";
import urlencode from "urlencode";
import { nl2br } from 'react-js-nl2br';

function Report() {
  const [header, setHeader] = useState([]);
  const [patient, setPatient] = useState([]);
  const [userinfo, setUserinfo] = useState([]);
  const [paperinfo, setPaperinfo] = useState([]);
  const [transfer, setTransfer] = useState([]);
  const [vsinfo, setVsinfo] = useState([]);
  const [body, setBody] = useState();
  const [table, setTable] = useState("PTSTBL    ");
  const [type, setType] = useState("PTS1      ");
  const [done, setDone] = useState(undefined);
  const [ocr, setOcr] = useState([]);
  const { ocmnum, chtnum, seq, user } = useParams();
  const nl2br = require('react-nl2br');

  // const userinfo = [
  //   {
  //     "datetime": "20/09/2565",
  //     "user": "วิชัย ศรีมนัส",
  //     "userCode": "70390 "
  //   }
  // ];
  // const paperinfo = [
  //   {
  //     "datetime": "            ",
  //     "code": "PTSL019   ",
  //     "textValue": "",
  //     "dataType": "CHECK",
  //     "topic": "TPTS03    ",
  //     "title": "ผลการตรวจ Lab /ฉบับ",
  //     "type": "PTS1      ",
  //     "ocmnum": " I2572    ",
  //     "user": "          ",
  //     "seq": "0",
  //     "codeValue": ""
  //   }, ,
  //   {
  //     "datetime": "202207201053",
  //     "code": "PTSL020 ",
  //     "textValue": "2",
  //     "dataType": "CHECK",
  //     "topic": "TPTS03 ",
  //     "title": "ผลการตรวจ X-RAY /แผ่น",
  //     "type": "PTS1 ",
  //     "ocmnum": " 13454292",
  //     "user": "W32 ",
  //     "seq": "35817",
  //     "codeValue": "Y"
  //   },
  //   {
  //     "datetime": "202207201053",
  //     "code": "PTSL021 ",
  //     "textValue": "1",
  //     "dataType": "CHECK",
  //     "topic": "TPTS03 ",
  //     "title": "OPD Clinical Record /ฉบับ",
  //     "type": "PTS1 ",
  //     "ocmnum": " 13454292",
  //     "user": "W32 ",
  //     "seq": "35818",
  //     "codeValue": "Y"
  //   },
  //   {
  //     "datetime": "202207201053",
  //     "code": "PTSL022 ",
  //     "textValue": "A",
  //     "dataType": "CHECK",
  //     "topic": "TPTS03 ",
  //     "title": "ฟิล์ม จำนวนทั้งหมด /แผ่น",
  //     "type": "PTS1 ",
  //     "ocmnum": " 13454292",
  //     "user": "W32 ",
  //     "seq": "35819",
  //     "codeValue": "Y"
  //   },
  //   {
  //     "datetime": " ",
  //     "code": "PTSL023 ",
  //     "textValue": "",
  //     "dataType": "CHECK",
  //     "topic": "TPTS03 ",
  //     "title": "General Summary Sheet หรือใบส่งตัวผู้ป่วยรักษาต่อ",
  //     "type": "PTS1 ",
  //     "ocmnum": " 13454292",
  //     "user": " ",
  //     "seq": "0",
  //     "codeValue": ""
  //   },
  //   {
  //     "datetime": " ",
  //     "code": "PTSL024 ",
  //     "textValue": "",
  //     "dataType": "CHECK",
  //     "topic": "TPTS03 ",
  //     "title": "Doctor`s Order Sheet / Admission Note / Progress Note",
  //     "type": "PTS1 ",
  //     "ocmnum": " 13454292",
  //     "user": " ",
  //     "seq": "0",
  //     "codeValue": ""
  //   },
  //   {
  //     "datetime": "202209201457",
  //     "code": "PTSL025 ",
  //     "textValue": "สำเนาบัตรประชาชน",
  //     "dataType": "CHECK",
  //     "topic": "TPTS03 ",
  //     "title": "เอกสารอื่นๆ",
  //     "type": "PTS1 ",
  //     "ocmnum": " 13454292",
  //     "user": "70390 ",
  //     "seq": "49284",
  //     "codeValue": "Y"
  //   }
  // ];
  // const vsinfo = [
  //   {
  //     "datetime": "            ",
  //     "code": "PTSL013   ",
  //     "textValue": "0.00",
  //     "dataType": "TEXT",
  //     "topic": "TPTS02    ",
  //     "title": "Temp =",
  //     "type": "PTS1      ",
  //     "ocmnum": "13454292  ",
  //     "user": "          ",
  //     "seq": "0",
  //     "codeValue": ""
  //   },
  //   {
  //     "datetime": "            ",
  //     "code": "PTSL014   ",
  //     "textValue": "0.00",
  //     "dataType": "TEXT",
  //     "topic": "TPTS02    ",
  //     "title": "Pulse =",
  //     "type": "PTS1      ",
  //     "ocmnum": "13454292  ",
  //     "user": "          ",
  //     "seq": "0",
  //     "codeValue": ""
  //   },
  //   {
  //     "datetime": "            ",
  //     "code": "PTSL015   ",
  //     "textValue": "0.00",
  //     "dataType": "TEXT",
  //     "topic": "TPTS02    ",
  //     "title": "RR =",
  //     "type": "PTS1      ",
  //     "ocmnum": "13454292  ",
  //     "user": "          ",
  //     "seq": "0",
  //     "codeValue": ""
  //   },
  //   {
  //     "datetime": "            ",
  //     "code": "PTSL016   ",
  //     "textValue": "0.00/0.00",
  //     "dataType": "TEXT",
  //     "topic": "TPTS02    ",
  //     "title": "BP =",
  //     "type": "PTS1      ",
  //     "ocmnum": "13454292  ",
  //     "user": "          ",
  //     "seq": "0",
  //     "codeValue": ""
  //   },
  //   {
  //     "datetime": "            ",
  //     "code": "PTSL017   ",
  //     "textValue": "0.00",
  //     "dataType": "TEXT",
  //     "topic": "TPTS02    ",
  //     "title": "O2 sat =",
  //     "type": "PTS1      ",
  //     "ocmnum": "13454292  ",
  //     "user": "          ",
  //     "seq": "0",
  //     "codeValue": ""
  //   }
  // ];
  // const xxx = "202207201505";
  // const transfer2 = [
  //   {
  //     "code": "PTSL001 ",
  //     "textValue": "To whom it may concern,",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "แพทย์ที่เกี่ยวข้อง",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211212020",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80899",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL018 ",
  //     "textValue": "Siriraj hospital",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "โรงพยาบาล",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211212020",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80900",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL003 ",
  //     "textValue": "For further management",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "1.เหตุผลในการส่งต่อ (Reason for Tranfer) :",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211212020",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80901",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL004 ",
  //     "textValue": "Congestive heart failure",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "2.เหตุผลในการรับผู้ป่วยไว้ในโรงพยาบาล (Reason for Admisson) :",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211212020",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80902",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL005 ",
  //     "textValue": "Echocardiogram:The AV,MV were thickened and calcified,no vegetation was seen,there was calcification of MV annulus,the LA,LV were enlarged,the LV was hypertrophy,the LVEF =72% without RWMA,doppler study showed mild AS,moderately severe AR,mild MR,mild TR,no cardiac thrombus,no percardial effusion.\n",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "3.ความสำคัญที่ตรวจ (Clinical Finding) :",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211212021",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80904",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL006 ",
  //     "textValue": "A 88-year-old female,she was a case of DM type 2,hyperlipidemia,hypertension,CAD hx PCI (28/09/2011),SSS post PPM(05/07/2022),AS,she presented with progressive dyspnea for 2 days without URI symptom,no chest pain.",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "ประวัติการเจ็บป่วยและการตรวจร่างกาย (Patient History & Physical Findings) :",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211212020",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80903",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL007 ",
  //     "textValue": "\n[17/11/2565 17:20] WBC/HPF (urine) result: 50-100\n\n[20/11/2565 07:38] Culture & sensitivity (HEMO C/S) ขวดที่ 1 result: \r\nSPECIMEN : Blood\r\nNo growth after 3 days\r\n\n\n\n[14/11/2565 07:17] Sugar (serum) [mg/dl] result: 170",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "Pertinent Lab Findings (Detail in attached lab) :",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211212033",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80908",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL008 ",
  //     "textValue": "AS AR with CHF\nUTI\nCAD hx of PCI\nSick sinus syndrome on PPM\nHypertension\nDiabetic mellitus type 2\nHyperlipidemia\nPseudogout",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "4.ข้อวินิฉันโรค (Diagnosis/Impression) :",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211212033",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80905",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL009 ",
  //     "textValue": "",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "5.หัตถการที่ได้รับ (Surgery/Procedure) :",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": " ",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": " ",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL010 ",
  //     "textValue": "Ertapenem 1 gm IV OD,sitafloxacin 50mg 1x2 ,Gracevit 50 mg 1x2,furosemide40mg 1/2x1,Apolet 75 mg 1x1,Losartan 50 mg 1x1,Madiplot 10 mg 1x1,Jardiance 10 mg 1x1,Ezetrol 10 mg 1x1,Atorvastatin 40 mg 1x1,Miracid 20 mg 1x1,Bisloc 2.5 mg 1/2x1,Colcine 0.6 mg 1x1, Naclong 600 mg 1x2 ,Pregabalin 25 mg 1x1,Chelated Mg 1x1 ",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "6.ยาและการรักษาที่ได้รับ (Treatment given) :",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211221258",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80909",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL011 ",
  //     "textValue": "Correct AS AR TAVI candidate",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "7.แผนการรักษาต่อ (Plan for further treatment) :",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211212024",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80906",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL012 ",
  //     "textValue": "No CHF",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "8.สภาพอาการผู้ป่วยก่อนเคลื่อนย้าย (Patient`s condition at transfer) :",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211212024",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80907",
  //     "table": "PTSTBL "
  //   }
  // ];
 

  //Discharge Date/Time

  let setData = [];
  let dataList = [];

  useEffect(() => {
    getPatientInfo();

  }, []);

  const getUserinfo = async () => {
    const request_Patient_Report = {
      params: {
        dbServiceName: "WSGetPatientPhysicalExamByUser",
        ocmnum: ocmnum,
      },
    };
    // const userinfonull = [
    //   {
    //     "datetime": "",
    //     "user": "",
    //     "userCode": ""
    //   }
    // ];
    // const userinfotest = [
    //   // {
    //   //   "datetime": "20/09/2565",
    //   //   "user": "วิชัย ศรีมนัส",
    //   //   "userCode": "70390 "
    //   // }
    // ];
    await axios
      .get(
        `${BaseUrl.ram_internet_discharge_summary_newborn_patient_DBService_JSON_path}`,
        request_Patient_Report
      )
      .then((response) => {
        const responseData4 = response.data.result;
        setUserinfo(response.data.result);
        console.log("userinfo", responseData4);
        getHeader();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getPatientInfo = async () => {
    const request_Patient_Report = {
      params: {
        dbServiceName: "HSPatientInfo",
        ocmnum: ocmnum,
      },
    };
    await axios
      .get(
        `${BaseUrl.ram_internet_discharge_summary_newborn_patient_DBService_JSON_path}`,
        request_Patient_Report
      )
      .then((response) => {
        const responseData = response.data.result;
        setPatient(response.data.result);
        console.log("patient", responseData);
        getPaperinfo();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getPaperinfo = async () => {
    console.log("sequnce : " + seq);
    const request_transfer_Report = {
      params: {
        dbServiceName: "SWPatientForm",
        ocmnum: ocmnum,
        chtnum: chtnum,
        table: table,
        type: type,
        topic: 'TPTS03',
        seq: seq
      },
    };
    await axios
      .get(
        `${BaseUrl.ram_internet_discharge_summary_newborn_patient_DBService_JSON_path}`,
        request_transfer_Report
      )
      .then((response) => {
        const responseData3 = response.data.result;
        setPaperinfo(response.data.result);
        console.log("paperinfo", responseData3);
        getTransferinfo();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getTransferinfo = async () => {
    const request_transfer_Report = {
      params: {
        dbServiceName: "SWPatientForm",
        ocmnum: ocmnum,
        chtnum: chtnum,
        table: table,
        type: type,
        topic: 'TPTS01',
        seq: seq
      },
    };
    await axios
      .get(
        `${BaseUrl.ram_internet_discharge_summary_newborn_patient_DBService_JSON_path}`,
        request_transfer_Report
      )
      .then((response) => {
        const responseData2 = response.data.result;
        setTransfer(response.data.result);
        console.log("transferinfo", responseData2);
        getvsinfo();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getvsinfo = async () => {
    const request_vs_Report = {
      params: {
        dbServiceName: "SWPatientForm",
        ocmnum: ocmnum,
        chtnum: chtnum,
        table: table,
        type: type,
        topic: 'TPTS02',
        seq: seq
      },
    };
    await axios
      .get(
        `${BaseUrl.ram_internet_discharge_summary_newborn_patient_DBService_JSON_path}`,
        request_vs_Report
      )
      .then((response) => {
        const responseData3 = response.data.result;
        setVsinfo(response.data.result);
        console.log("vsinfo", responseData3);
        getUserinfo();
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const getHeader = async () => {
    const request_Header_Report = {
      params: {
        dbServiceName: "SWPhysicalExamTopic2",
        table: table,
        type: type,
      },
    };
    await axios
      .get(
        `${BaseUrl.ram_internet_discharge_summary_newborn_patient_DBService_JSON_path}`,
        request_Header_Report
      )
      .then((response) => {
        const responseData = response.data.result;
        setHeader(response.data.result);
        console.log("header", responseData);

      })
      .catch((error) => {
        console.error(error);
      });
  };




  useEffect(() => {
    getBody();
  }, [header]);

  const getBody = async () => {
    let setRequst = [];
    for (let i = 0; i < header.length; i++) {
      const requestBody = {
        // params: {
        //   dbServiceName: "SWPatientFormList",
        //   ocmnum: ocmnum, // (เลขการรกษาของคนไขในรอบ รบมาจากหนา web P’Jane)
        //   type: type, //(column code in picture 1 )
        //   topic: header[i].topic, //(column “topic” in picture 2 )
        // },

        params: {
          dbServiceName: "SWPatientForm",
          ocmnum: ocmnum,
          chtnum: chtnum,
          table: table,
          type: type,
          topic: header[i].topic,
          seq: seq
        }
      };
      setRequst.push(
        await axios
          .get(
            `${BaseUrl.ram_internet_discharge_summary_newborn_patient_DBService_JSON_path}`,
            requestBody
          )
          .then((response) => {
            setData.push(response.data.result);
          })
          .catch((error) => console.error(error))
      );
    }

    // if (body != undefined || body.length > 0) {
    //   body.map((body, i) => {
    //     console.log("Data", body);
    //   });
    // }

    if (setData.length > 0) {
      console.log("Body", setData);
      // await getOcrNumber();
      await getData();
      await setDone(true);
    }
  };
  function ocrheader() {
    // if (setData.length > 0) {
    console.log("Body", setData);
    getOcrNumber();
    // getData();
    // setDone(true);
    // }
  }
  const getOcrNumber = () => {

    if (user.trim()) {


      const request_config = {
        params: {
          prm_ocm: urlencode(ocmnum.trim()), //ocm
          prm_date: urlencode(currentYearMonthDay()), //date
          prm_type: urlencode("ACC15"), //รหัสเอกสาร
          prm_user: urlencode(user), //user ใช้งาน
        },
      };

      axios
        .get(
          `http://10.151.212.181/AWSqlConnect/RequestOCR.php`,
          request_config
        )
        .then(async (response) => {
          try {
            let responseData = await response.data;
            console.log(responseData, 'ocrdata');
            await setOcr(responseData);
            await setTimeout(() => {
              window.print();
            }, 2000);
            console.log('You clicked window print.');
          } catch (error) {
            console.log(error);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const getData = () => {
    setData.map((body, i) => {
      body.map((list, i) => {
        dataList.push(list);
      });
    });

    console.log("list", dataList);

  };

  return (
    <>
      {!done ? (
        <div className="justify-center flex mt-96 content-center ">
          <ReactLoading
            type={"spin"}
            color={"#3c4187"}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <div className=" ">
          {!done ? null : (
            <div className=" px-5 py-2 w-screen text-3xl font-bold shadow-lg items-center bg-slate-50 flex space-x-6 mb-3">
              {/* <img src={LoGo} className=" " width="300" alt="" /> */}
              <p classname="">Patient transfer summary</p>
              <button
               onClick={() => {
                getOcrNumber();
              }}
                className=" border-black rounded-md hover:bg-indigo-900 h-10  hover:text-white border parafont2 px-5 "
              >
                Print
              </button>
            </div>
          )}

          <div >
            <page
              size="A4"
              id="section-to-print"
              className="div-container-print "
            >


              <thead>
                {/* page1 */}
                <header className="grid grid-cols-3 parafont" style={{marginBottom:"10px"}}>
                  <div className="header-1 ">
                    <div className="border border-black  border-r-0 border-b-0 pl-5 place-items-center">
                      <img src={LoGo} className=" w-11/12" alt="" />
                      {/* <div className="col-span-3 ">
                <p>โรงพยาบาลรามคำแหง</p>
                <p className="text-xxs uppercase">Ramkhamhaeng Hospital</p>
                <p className="text-xxs">https://www.ram-hosp.co.th</p>
              </div> */}
                    </div>
                    <div className="border border-black border-r-0 grid grid-cols-4  place-items-center" style={{ height: "67px" }}>
                      <div className=" col-span-4 text-center">
                        <b>
                          Patient transfer <br /> summary
                        </b>
                      </div>
                    </div>
                  </div>
                  <div className="border border-black border-r-0 p-1 -mr-10 space-y-1 pt-0.5">
                    {patient.map((data, i) => (
                      <>
                        <div key={i} className="flex space-x-4">
                          <p className="font-bold">Name:</p>
                          &nbsp;{data.name}
                        </div>
                        <div className="flex space-x-4">
                          <p className="font-bold">Birthday: </p>
                          &nbsp;{data.BirthDte}{" "}
                          <p className="font-bold">Age (Y.M.D):</p>
                          &nbsp;{data.age}
                        </div>
                        <div className="flex space-x-4 "></div>
                        <div className="flex space-x-4">
                          <p className="font-bold">HN: </p>
                          &nbsp;{data.hn}
                          <p className="font-bold">AN: </p>
                          &nbsp;{data.AN_VN}
                        </div>
                        <div className="flex space-x-4">
                          <p className="font-bold">Register date: </p>
                          {/* &nbsp;{data.registerDatetime} */}
                          <br />
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="border overflow-hidden border-black ml-5 place-items-center center-kit">
                    {ocr.length > 0 ? (
                      <div className="text-white headertitleocr mt-1.5">
                        +{ocr[0].Return}+
                      </div>
                    ) : null}
                    <div className="hidden mt-7 font-thin">
                      {patient.map((data, i) => (
                        <Barcode
                          height="25"
                          width="1"
                          displayValue="false"
                          format="CODE39"
                          // textMargin={2}
                          // fontSize={20}
                          value={data.hn}
                        />
                      ))}
                    </div>
                  </div>
                </header>
              </thead>
              <tbody>
                {/* page1 */}
                <div className="mx-2 my-1 parafont " style={{ marginTop: "10px"}}>
                  <div className=" grid grid-cols-3 gap-5 my-1">
                    <div className=" col-span-2 parafont">
                      เรียนแพทย์ที่เกี่ยวข้อง &nbsp; {transfer[0].textValue}
                    </div>
                    <div className=" col-span-1 ml-4 parafont">
                      ร.พ. {transfer[1].textValue}
                    </div>
                  </div>
                  <p>The patient was seen at Phayao Ram Hospital on &nbsp; {transfer[0].datetime.substring(6, 8)}/{transfer[0].datetime.substring(4, 6)}/{parseInt(transfer[0].datetime.substring(0, 4)) + 543} {transfer[0].datetime.substring(8, 10)}:{transfer[0].datetime.substring(10, 12)} น.&nbsp;and will be transferred to receive further investigations and/or medical care at your hospital.</p>
                  <p><b>the following is the summary of his/her clinical information :</b></p>
                  <p className=""><b>1. เหตุผลในการส่งต่อ (Reason for Transfer) :</b> &nbsp; {nl2br(transfer[2].textValue)}</p>
                  <p className=""><b>2. เหตุผลในการรับผู้ป่วยไว้ในโรงพยาบาล (Reason for Admission) :</b> &nbsp; {nl2br(transfer[3].textValue)}</p>
                  <p className=""><b>3. ความสำคัญที่ตรวจพบ (Clinical Finding) :</b> &nbsp; {nl2br(transfer[4].textValue)}</p>
                  <p className=""><b>ประวัติการเจ็บป่วยและการตรวจร่างกาย (Patient History & Physical Findings) :</b> &nbsp; {nl2br(transfer[5].textValue)}</p>
                  <p className=""><b>Pertinent Lab Findings : [Details in attached lab.] :</b> &nbsp; {nl2br(transfer[6].textValue)}</p>
                  <p className=""><b>4. ข้อวินิฉัยโรค (Diagnosis/Impression) :</b> &nbsp; {nl2br(transfer[7].textValue)}</p>
                  <p className=""><b>5. หัตถการที่ได้รับ (Surgery/Procedure) :</b> &nbsp; {nl2br(transfer[8].textValue)}</p>
                  <p className=""><b>6. ยาและการรักษาที่ได้รับ (Treatment given) :</b> &nbsp; {nl2br(transfer[9].textValue)}</p>
                  <p className=""><b>7. แผนการรักษาต่อ (Plan for further treatment) :</b> &nbsp; {nl2br(transfer[10].textValue)}</p>
                  <p className=""><b>8. สภาพอาการผู้ป่วยก่อนเคลื่อนย้าย (Patient's condition at transfer) :</b> &nbsp; {nl2br(transfer[11].textValue)}</p>
                  <p><b>9. V/S ก่อนเคลื่อนย้าย :</b> T &nbsp;{vsinfo[0].textValue} &nbsp;°C, P &nbsp;{vsinfo[1].textValue} &nbsp; /min, RR &nbsp;{vsinfo[2].textValue} &nbsp; /min, BP &nbsp;{vsinfo[3].textValue} &nbsp; mmHg, O₂Sat &nbsp;{vsinfo[4].textValue} &nbsp; %</p>
                  <p>If you have any question, you may contact us at Tel 054-411-111 Ext, ......................................................</p>
                  <p style={{ marginTop: "25px" }}>Sencerely</p>
                  <div className=" grid grid-cols-4 gap-3 my-1" style={{ marginTop: "5px" }}>
                    <div className=" col-span-2 parafont">
                      <div className=" grid grid-cols-6 gap-3 my-1">
                        <div className=" col-span-2 parafont signuser">Physician Signature</div>
                        <div className=" col-span-4 parafont signuser">&nbsp; ................................................. &nbsp;M.D.</div>

                      </div>

                    </div>
                    <div className=" col-span-2 ml-4 parafont">
                      Date &nbsp; &nbsp;&nbsp;{userinfo[0].datetime}
                    </div>

                    <div className=" col-span-2 parafont" style={{ marginTop: "-25px" }}>
                      <div className=" grid grid-cols-6 gap-3 my-1">
                        <div className=" col-span-2 parafont signuser"></div>
                        <div className=" col-span-4 parafont signuser">({userinfo[0].user})</div>
                      </div>
                    </div>
                  </div>
                  <p>กรุณาบันทึกเอกสารให้ครบถ้วนทุกช่อง ก่อนนำส่งเอกสารให้ผู้ป่วยเพื่อการส่งต่อรักษา</p>
                  {/* <div className="w-full grid grid-cols-3" style={{ marginTop: "10" }}>
                <div className="hidden w-80"><b>EMR:ACC-15</b></div>
                <div className="hidden text-center w-60 "><b>Page 1 of 2</b></div>
                <div className="hidden text-right w-71"><b>FACC00015Rev03</b></div>
              </div> */}
                  <br />
                </div>
                {/* page2 */}
                {/* <div style={{ breakAfter: "page" }}></div> */}

              </tbody>
              <tbody>
                <div className="mx-2 my-1 parafont " style={{ marginTop: "70px"}}>
                  <p>ข้าพเจ้ารับทราบความเสี่ยงที่อาจเกิดขึ้นขณะเคลื่อนย้าย และยินยอมให้ทำการเคลื่อนย้ายได้</p>
                  <p>ข้าพเจ้ายินยอมให้โรงพยาบาลพะเยา ราม ส่งประวัติสุขภาพตามเอกสารฉบับนี้ รวมถึงประวัติสุขภาพอื่นที่ส่งเพิ่มเติมให้แก่แพทย์และบุคลากรทางการแพทย์ของโรงพยาบาลที่รับการปรึกษาหรือรับการส่งตัวผู้ป่วย และข้าพเจ้ายินยอมให้แพทย์และบุคลากรทางการแพทย์ในโรงพยาบาลนั้นรวบรวม จัดเก็บ และใช้ประวัติสุขภาพดังกล่าว เพื่อประโยชน์ในการรักษาและดูแลสุขภาพของผู้ป่วยที่ได้ระบุในเอกสารฉบับนี้</p>
                  <div className=" grid grid-cols-4 gap-3 my-1" style={{ marginTop: "70px" }}>
                    <div className=" col-span-2 parafont signpage2">
                      ลงชื่อ &nbsp; ........................................................... &nbsp;
                    </div>
                    <div style={{ marginLeft: "53px" }} className=" col-span-1 ml-4 parafont">
                      <div id="squares">
                        <div id="square1"></div>
                      </div>
                      ผู้ให้ความยินยอม
                    </div>
                    <div className=" col-span-1 ml-4 parafont">
                      <div id="squares">
                        <div id="square1"></div>
                      </div>
                      ผู้กระทำการแทน
                    </div>
                  </div>
                  <div className=" grid grid-cols-4 gap-3 my-1" style={{ marginTop: "15px" }}>
                    <div className=" col-span-2 parafont signpage2">
                      <p style={{ marginLeft: "162px" }}>(...................................................................)</p>
                    </div>
                    <div className=" col-span-2 ml-4 parafont" style={{ marginLeft: "84px" }}>
                      ความสัมพันธ์ .................................................
                    </div>
                  </div>
                  <div className=" grid grid-cols-4 gap-3 my-1" style={{ marginTop: "20px" }}>
                    <div className=" col-span-2 parafont signpage2">
                      วันที่ &nbsp; ........................................................... &nbsp;
                    </div>
                  </div>
                  <p style={{ marginTop: "80px" }}><u>เอกสารที่ให้กับผู้ร้องขอ</u></p>
                  <div className=" grid grid-cols-4 gap-3 my-1" style={{ marginTop: "15px" }}>
                    {paperinfo.map((data) =>
                      data.codeValue === "Y" && data.code.includes("019") ? (
                        <div className=" col-span-2 parafont" style={{ marginLeft: "" }}>
                          <div className=" grid grid-cols-4 gap-3 my-1">
                            <div className=" col-span-2 parafont">
                              <p>
                                <div id="squares">
                                  <div id="square1">&#10004;</div>
                                </div>&nbsp;ผลการตรวจ Lab
                              </p></div>
                            <div className=" col-span-2 parafont" style={{ textAlign: "center" }}>
                              {data.textValue} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ฉบับ
                            </div>
                          </div>
                        </div>

                      ) :
                        (data.codeValue === "Y" && data.code.includes("020"))
                          ?
                          <div className=" col-span-2 parafont" style={{ marginLeft: "" }}>
                            <div className=" grid grid-cols-4 gap-3 my-1">
                              <div className=" col-span-2 parafont">
                                <p style={{ marginLeft: "" }}>
                                  <div id="squares">
                                    <div id="square1">&#10004;</div>
                                  </div>&nbsp;ผลการตรวจ X-RAY
                                </p></div>
                              <div className=" col-span-2 parafont" style={{ textAlign: "center" }}>
                                {data.textValue} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;แผ่น
                              </div>
                            </div>
                          </div>
                          :
                          (data.codeValue === "Y" && data.code.includes("021"))
                            ?
                            <div className=" col-span-2 parafont" style={{ marginLeft: "" }}>
                              <div className=" grid grid-cols-4 gap-3 my-1">
                                <div className=" col-span-2 parafont">
                                  <p style={{ marginLeft: "" }}>
                                    <div id="squares">
                                      <div id="square1">&#10004;</div>
                                    </div>&nbsp;OPD Clinical Record
                                  </p></div>
                                <div className=" col-span-2 parafont" style={{ textAlign: "center" }}>
                                  {data.textValue} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ฉบับ
                                </div>
                              </div>
                            </div>
                            :
                            (data.codeValue === "Y" && data.code.includes("022"))
                              ?
                              <div className=" col-span-2 parafont" style={{ marginLeft: "" }}>
                                <div className=" grid grid-cols-4 gap-3 my-1">
                                  <div className=" col-span-2 parafont">
                                    <p style={{ marginLeft: "" }}>
                                      <div id="squares">
                                        <div id="square1">&#10004;</div>
                                      </div>&nbsp;ฟิล์ม จำนวนทั้งหมด
                                    </p></div>
                                  <div className=" col-span-2 parafont" style={{ textAlign: "center" }}>
                                    {data.textValue} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;แผ่น
                                  </div>
                                </div>
                              </div>
                              :
                              (data.codeValue === "Y" && data.code.includes("025"))
                                ?
                                <div className=" col-span-2 parafont" style={{ marginLeft: "" }}>
                                  <p style={{ marginLeft: "" }}>
                                    <div id="squares">
                                      <div id="square1">&#10004;</div>
                                    </div>&nbsp;เอกสารอื่นๆ&nbsp;&nbsp;&nbsp;{data.textValue}
                                  </p>
                                </div>
                                :
                                (data.code.includes("025") && data.textValue === "")
                                  ?
                                  <div className=" col-span-2 parafont" style={{ marginLeft: "" }}>
                                    <p style={{ marginLeft: "" }}>
                                      <div id="squares">
                                        <div id="square1"></div>
                                      </div>&nbsp;เอกสารอื่นๆ ...................................................
                                    </p>
                                  </div>

                                  :
                                  <div className=" col-span-2 parafont" style={{ marginLeft: "" }}>
                                    <p style={{ marginLeft: "" }}>
                                      <div id="squares">
                                        <div id="square1"></div>
                                      </div>&nbsp;{data.title}&nbsp;{data.textValue}
                                    </p>
                                  </div>
                    )}
                    {/* {paperinfo.map((data) =>
                  (data.codeValue === "Y" && data.code === "PTSL025 ") ? (
                    <div className=" col-span-2 parafont" style={{ marginLeft: "" }}>
                      <p style={{ marginLeft: "" }}>
                        <div id="squares">
                          <div id="square1"></div>
                        </div>เอกสารอื่นๆ
                      </p>
                    </div>
                  ) :
                    <div></div>
                )} */}
                    {/* {paperinfo[7].codeValue === "Y" && paperinfo[7].code === "PTSL025 " ?
                  <div className=" col-span-2 parafont" style={{ marginLeft: "" }}>
                    <p style={{ marginLeft: "" }}>
                      <div id="squares">
                        <div id="square1"></div>
                      </div>&nbsp;เอกสารอื่นๆ ...........................................................
                    </p>
                  </div>
                  : ""
                } */}

                    {/* <div className=" col-span-2 parafont" style={{ marginLeft: "" }}>
                  <p style={{ marginLeft: "" }}>
                    <div id="squares">
                      <div id="square1"></div>
                    </div>&nbsp;เอกสารอื่นๆ ...................................................
                  </p>
                </div> */}
                  </div>
                  <div className=" grid grid-cols-4 gap-3 my-1" style={{ textAlign: "center", marginTop: "100px" }}>
                    <div className=" col-span-2 parafont">
                      ลงชื่อ &nbsp; ........................................................... &nbsp; ผู้รับเอกสาร
                    </div>
                    <div className=" col-span-2 ml-4 parafont">
                      ลงชื่อ &nbsp; ........................................................... &nbsp; ผู้ให้เอกสาร
                    </div>
                    <div className=" col-span-2" style={{ marginLeft: "-32px" }}>
                      (..............................................................)
                    </div>
                    <div className=" col-span-2" style={{ marginLeft: "-25px" }}>
                      (..............................................................)
                    </div>
                    <div className=" col-span-2" style={{ marginLeft: "-32px", marginTop: "15px" }}>
                      วันที่ ..................../..................../....................
                    </div>
                    <div className=" col-span-2" style={{ marginLeft: "-32px", marginTop: "15px" }}>
                      วันที่ ..................../..................../....................
                    </div>
                  </div>
                  {/* <div className="w-full grid grid-cols-3" style={{ marginTop: "200px" }}>
                <div className="hidden w-80"><b>EMR:ACC-15</b></div>
                <div className="hidden text-center w-60 "><b>Page 2 of 2</b></div>
                <div className="hidden text-right w-71"><b>FACC00015Rev03</b></div>
              </div> */}
                  <br />
                </div>
              </tbody>
            </page>
          </div>
        </div>
      )}
    </>
  );
}

export default Report;