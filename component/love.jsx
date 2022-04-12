import React from "react";
import { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
const Love = () => {
  const [min, setmin] = useState(0);
  const [sec, setsec] = useState(0);
  const [milisec, setmilisec] = useState(0);
  const [premin, setpremin] = useState(0);
  const [presec, setpresec] = useState(0);
  const [premilisec, setpremilisec] = useState(0);
  const [running, setbut] = useState(false);
  const [listlap, setlistlap] = useState([]);
  var timer;

  useEffect(() => {
    if (running === true) {
      timer = setInterval(() => {
        setmilisec((milisec) => milisec + 1);
        if (milisec == 100) {
          setsec((sec) => sec + 1);
          setmilisec(0);
        }
        if (sec == 60) {
          setsec(0);
          setmin(min + 1);
        }
      }, 10);
      return()=>clearInterval(timer);
    }
    else{
        setmin(0);
        setmilisec(0);
        setsec(0);
        setpremilisec(0);
        setpremin(0);
        setpresec(0);
        clearInterval(timer);
    }
  });

  const lap = () => {
    let tempms = 0,
      tempsc = 0,
      tempmn = 0;
    if (milisec >= premilisec) {
      tempms = milisec - premilisec;
    } else {
      tempms = milisec + 100 - premilisec;
      tempsc--;
    }
    setpremilisec(milisec);
    if (sec >= presec) {
      tempsc = sec - presec;
    } else {
      tempsc = sec + 60 - presec;
      tempmn--;
    }
    setpresec(sec);
    tempmn += min;
    tempmn -= premin;
    setpremin(min);
    const newlap = [...listlap].concat({ tempmn, tempsc, tempms });
    setlistlap(newlap);
  };
  const formatter = function (m) {
    return m > 10 ? m : "0" + m;
  }
  return (
    <View>
      <Text>{`${formatter(min)}:${formatter(sec)},${formatter(milisec)}`}</Text>

      <Button onPress={lap} title="lap"></Button>
      <Button
        onPress={() => {
          setbut(true);
        }}
        title="start"
      ></Button>
      <Button
        onPress={() => {
          setbut(false);
        }}
        title="reset"
      ></Button>
      {listlap.map((item, id) => (
        <Text key={id}>
          {`Lap #${id}: ${formatter(item.tempmn)}:${formatter(item.tempsc)},${formatter(item.tempms)}`}
        </Text>
      ))}
    </View>
  );
};
export default Love;
