import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  styled,
} from "@mui/material";

import MobileStepper from "@mui/material/MobileStepper";
import AnimatedNumber from "react-animated-numbers";
import Highcharts from "highcharts";

//IMAGES
import planeImage from "../../../src/assets/plane.png";
import foodImage from "../../../src/assets/alimentos.png";
import trafficImage from "../../../src/assets/traffic_car.jpg";
import shopperImage from "../../../src/assets/shopper.jpg";
import fuelImage from "../../../src/assets/fuel.jpg";
import bckgd from "../../assets/bgd.jpg";
import sustainablebg from "../../assets/sustbg5.png";
import leafImage from "../../assets/greenleaf.png";
import skyVideo from "../../../src/assets/videos/forest.mp4";

//ICONS
import { BiDotsHorizontalRounded } from "react-icons/bi";

const steps = [
  {
    id: 1,
    label: "flying_habit",
    image: planeImage,
    video: "../../../src/assets/videos/plane.mp4",

    question: `Como você descreve seus hábitos de voo em um ano típico?`,
    option: [
      {
        res: "Eu voo raramente ou nunca",
        value: 2,
      },
      {
        res: "Ocasionalmente",
        value: 4,
      },
      {
        res: "Regularmente",
        value: 10,
      },
      {
        res: "Insira um valor personalizado",
        value: 0,
      },
    ],
  },
  {
    id: 2,
    label: "personal_diet",
    image: foodImage,
    question: "O que melhor descreve sua dieta?",
    option: [
      {
        res: "Vegano",
        value: 2,
      },
      {
        res: "Vegetariano",
        value: 4,
      },
      {
        res: "Pescetariano",
        value: 6,
      },
      {
        res: "Tento comer menos carne.",
        value: 3,
      },
      {
        res: "Eu como de tudo",
        value: 10,
      },
    ],
  },
  {
    id: 3,
    label: "car_fuel",
    image: fuelImage,
    question: `Que tipo de combustível seu carro usa?`,
    option: [
      {
        res: "Elétrica (energia verde)",
        value: 2,
      },
      {
        res: "Elétrica",
        value: 3,
      },
      {
        res: "Gás natural",
        value: 6,
      },
      {
        res: "Gasolina, diesel ou híbrido",
        value: 10,
      },
      {
        res: "Não tenho carro",
        value: 0,
      },
    ],
  },
  {
    id: 4,
    label: "car_ride",
    image: trafficImage,
    question: `Com que frequência você se desloca de carro anualmente?`,
    option: [
      {
        res: "Eu não dirijo nem ando de carro.",
        value: 2,
      },
      {
        res: "Até 5.000 km",
        value: 3,
      },
      {
        res: "5.000 - 10.000 km",
        value: 6,
      },
      {
        res: "10.000 - 15.000 km",
        value: 10,
      },
      {
        res: "Insira quilômetros",
        value: 0,
      },
    ],
  },
  {
    id: 5,
    label: "shopping_habit",
    image: shopperImage,
    question: `Com que frequência você faz compras?`,
    option: [
      {
        res: "Raramente",
        value: 2,
      },
      {
        res: "Mediano",
        value: 3,
      },
      {
        res: "Comprador(a)",
        value: 6,
      },
      {
        res: "Comprador(a) de luxo",
        value: 10,
      },
    ],
  },
];

export default function Inventory() {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;
  const [personal_diet, setPersonal_diet] = useState(0);
  const [flying_habit, setFlying_habit] = useState(0);
  const [shopping_habit, setShopping_habit] = useState(0);
  const [car_fuel, setCar_fuel] = useState(0);
  const [car_ride, setCar_ride] = useState(0);

  const [selectedValues, setSelectedValues] = useState(
    Array(maxSteps).fill(null)
  );

  const [quizCompleto, setQuizCompleto] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [isOptionSelected, setIsOptionSelected] = useState(false);

  useEffect(() => {
    // Check if an option is selected for the current step
    setIsOptionSelected(selectedValues[activeStep] !== null);

    // Check if all steps have selected options
    const allStepsSelected = selectedValues.every((value) => value !== null);
    setQuizCompleto(allStepsSelected);
  }, [selectedValues, activeStep]);
  // console.log("AQUUIII:", quizCompleto);

  // useEffect(() => {
  //   // Check if all steps have selected options
  //   const allStepsSelected = selectedValues.every((value) => value !== null);
  //   setQuizCompleto(allStepsSelected);
  // }, [selectedValues]);

  const [currentAmountInTons, setCurrentAmountInTons] = useState(0);

  useEffect(() => {
    const totalSum =
      Number(personal_diet) +
      Number(flying_habit) +
      Number(shopping_habit) +
      Number(car_fuel) +
      Number(car_ride);
    setCurrentAmountInTons(totalSum);
  }, [personal_diet, flying_habit, shopping_habit, car_fuel, car_ride]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleProcess = () => {
    setShowResult(true);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleRadioChange = (value) => {
    const updatedValues = [...selectedValues];
    updatedValues[activeStep] = value;
    setSelectedValues(updatedValues);

    switch (activeStep) {
      case 0:
        setFlying_habit(value);
        break;
      case 1:
        setPersonal_diet(value);
        break;
      case 2:
        setCar_fuel(value);
        break;
      case 3:
        setCar_ride(value);
        break;
      case 4:
        setShopping_habit(value);
        break;
      default:
        break;
    }
  };

  const handleRecalculate = () => {};

  const VideoComponent = () => {
    return (
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={skyVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };

  useEffect(() => {
    const options = {
      chart: {
        type: "column",
        renderTo: "column-chart",
        backgroundColor: "transparent",
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: ["Voos", "Compras", "Dieta", "Carro", "Público"],
        gridLineWidth: 0,
        minorGridLineWidth: 0,
        lineWidth: 0,
        tickWidth: 0,
        labels: {
          style: {
            color: "white",
          },
        },
      },
      yAxis: {
        visible: false,
        title: {
          text: "",
        },
        gridLineWidth: 0,
        minorGridLineWidth: 0,
        lineWidth: 0,
        tickWidth: 0,
      },
      legend: {
        enabled: false,
      },
      credits: { enabled: false },
      plotOptions: {
        column: {
          borderRadius: 50,
          borderWidth: 0,
          pointWidth: 15,
        },
      },
      series: [
        {
          name: "Emissões",
          data: [10, 25, 15, 30, 20],
          color: "#18cea0",
          dataLabels: {
            enabled: true,
            format: "{y} tons",
            style: {
              color: "#ffffff",
            },
          },
        },
      ],
    };

    const chart = new Highcharts.Chart(options);

    return () => {
      chart.destroy();
    };
  }, [showResult]);

  const MainContainer = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      padding: showResult ? "0 20px" : "",
    },
  }));

  const HeaderComponent = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      marginTop: "5%",
      ".logo": {
        display: "none",
      },
    },
  }));

  const ContentBox = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      width: "100%",
      padding: showResult ? 4 : "",
      ".question_box": {
        width: "100%",
        display: showResult ? "none" : "flex",
      },
      ".question": {
        marginBottom: 0,
      },
      ".question_image_box": {
        width: "80%",
        marginTop: 0,
      },
      ".radioGroupForm": {
        marginTop: "20%",
        marginLeft: 12,
      },
    },
  }));

  const ResultBox = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      width: "100%",
      display: showResult ? "flex" : "none",
      ".sua_pegada_em_categoria_style": { fontSize: 22, width: "80%" },
    },
  }));

  return (
    <MainContainer
      // height={"100vh"}
      // background={"#F1F3F6"}
      // direction={"column"}
      // alignItems={"center"}
      sx={{
        backgroundImage: `url(${bckgd})`,
        backgroundPosition: "center",
        backgroundOrigin: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingX: 5,
        height: "100vh",
        backgroundColor: "#F1F3F6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // paddingY: 2,
      }}
    >
      <HeaderComponent
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack>
          <img
            src={leafImage}
            alt="image"
            loading="lazy"
            width={40}
            style={{ cursor: "pointer" }}
          />
          <Typography
            fontWeight={"bold"}
            fontSize={20}
            color={"#49af6b"}
            className="logo"
          >
            Decarb
            <span style={{ color: "#417e61" }}>
              CO<sub>2</sub>
            </span>
          </Typography>
        </Stack>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            fontSize={40}
            fontWeight={"bold"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ height: 50 }}
          >
            <AnimatedNumber
              animateToNumber={currentAmountInTons}
              includeComma
              config={{ tension: 89, friction: 40 }}
              animationType="calm"
            />
          </Typography>
          <Typography fontSize={13} fontWeight={"bold"}>
            Tons CO<sub>2</sub>e
          </Typography>
        </Box>

        <Box>
          <BiDotsHorizontalRounded size={30} />
        </Box>
      </HeaderComponent>
      {/* ======================================================= */}
      <ContentBox
        sx={{
          background: "#ffffff",
          borderRadius: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          overflow: "hidden",
          height: "70%",
          marginTop: 5,
          padding: 3,
        }}
      >
        <Stack>
          <Box
            sx={{
              background: "#ffffff",
              width: "40rem",
              height: "100%",
              display: "none",
              flexDirection: "column",
              alignItems: "center",
            }}
            // className="question_box"
          >
            <Typography
              sx={{
                fontSize: 60,
                fontWeight: "bold",
                marginTop: 15,
                flexWrap: "wrap",
                textAlign: "center",
              }}
            >
              A consciência planetária edifica um futuro sustentável.
            </Typography>
            <Button
              variant="contained"
              disableElevation
              sx={{
                textTransform: "initial",
                borderRadius: 50,
                background: "#0fc05f",
                fontSize: 16,
                fontWeight: "bold",
                "&:hover": { background: "#0fc05f" },
                marginTop: 10,
              }}
              // onClick={handleRecalculate}
            >
              Recalcular
            </Button>
          </Box>
          <Stack
            sx={{
              background: "#ffffff",
              width: "40rem",
              height: "100%",
              flexDirection: "column",
              backgroundImage: `url(${sustainablebg})`,
              backgroundPosition: "left",
              backgroundOrigin: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              borderRadius: 5,
            }}
            className="question_box"
          >
            <Typography
              textAlign={"center"}
              paddingX={"10%"}
              color={"#676767"}
              sx={{
                //   background: "#fc4545",
                minHeight: 100,
                fontSize: 20,
                marginY: 5,
              }}
              className="question"
            >
              {steps[activeStep].question}
            </Typography>

            {/* ======================================================= */}
            <Stack
              sx={{
                width: "50%",
                minHeight: 135,
                //   marginTop: 10,
                alignSelf: "center",
              }}
              className="question_image_box"
            >
              <img
                src={steps[activeStep].image}
                alt="image"
                loading="lazy"
                width={"100%"}
                style={{ borderRadius: 10 }}
              />
            </Stack>
            {/* ======================================================= */}

            <Stack
              sx={{
                alignSelf: "flex-start",
                marginTop: 15,
                marginLeft: 15,
                marginBottom: 20,
              }}
              className="radioGroupForm"
            >
              <FormControl>
                <RadioGroup
                  key={steps[activeStep].id}
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={selectedValues[activeStep]}
                  onChange={(e) => handleRadioChange(e.target.value)}
                  name="radio-buttons-group"
                  onBlur={(e) => e.preventDefault()}
                >
                  {steps[activeStep].option.map((item) => {
                    return (
                      <FormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<Radio color="success" />}
                        label={item.res}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </Stack>
          </Stack>
        </Stack>

        {/* ======================================================= */}
        <ResultBox
          sx={{
            width: "30rem",
            height: "100%",
            borderRadius: 5,
            overflow: "hidden",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <VideoComponent />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              color: "#ffffff",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              display: showResult ? "flex" : "none",
              background: showResult ? "rgba(0, 0, 0, 0.5)" : "",
            }}
          >
            <Typography
              sx={{ textAlign: "center", marginTop: 10, fontSize: 20 }}
              fontWeight={"bold"}
            >
              Esta é a sua pegada de carbono anual:
            </Typography>

            <Box sx={{ textAlign: "center" }}>
              <Typography fontSize={80} fontWeight={"bold"}>
                {/* 5,53 */}
                {currentAmountInTons}
              </Typography>
              <Typography fontSize={13} fontWeight={"bold"}>
                Tons CO<sub>2</sub>e
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Typography
                fontSize={25}
                fontWeight={"bold"}
                textAlign={"center"}
                className="sua_pegada_em_categoria_style"
              >
                Entenda sua pegada por categoria
              </Typography>

              <div
                id="column-chart"
                style={{
                  width: "80%",
                  height: "200px",
                }}
              ></div>
            </Box>
          </div>
        </ResultBox>
      </ContentBox>
      <MobileStepper
        sx={{ background: "none", marginTop: 4 }}
        variant=""
        steps={3}
        position="static"
        activeStep={0}
        nextButton={
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
            sx={{ width: "100%" }}
          >
            <Button
              sx={{
                color: "#42545C",
                fontWeight: "bold",
                textTransform: "capitalize",
                border: "none",
                outline: "none",
                outlineColor: "none",
                outlineStyle: "none",
              }}
              onClick={handleBack}
              disabled={activeStep === 0 || showResult}
            >
              Voltar
            </Button>
            {quizCompleto ? (
              showResult ? (
                <Button
                  variant="contained"
                  sx={{
                    background: "#0fc05f",
                    color: "#ffffff",
                    paddingX: 4,
                    borderRadius: 50,
                    textTransform: "capitalize",
                    fontSize: 16,
                    "&:hover": { background: "#0fc05f" },
                  }}
                  onClick={handleProcess}
                  // disabled={activeStep === maxSteps - 1}
                  // disabled={!isOptionSelected || activeStep === maxSteps - 1}
                >
                  Continuar
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    background: "#0fc05f",
                    color: "#ffffff",
                    paddingX: 4,
                    borderRadius: 50,
                    textTransform: "capitalize",
                    fontSize: 16,
                    "&:hover": { background: "#0fc05f" },
                  }}
                  onClick={handleProcess}
                  // disabled={activeStep === maxSteps - 1}
                  // disabled={!isOptionSelected || activeStep === maxSteps - 1}
                >
                  Processar
                </Button>
              )
            ) : (
              <Button
                variant="contained"
                sx={{
                  background: "#42545C",
                  color: "#ffffff",
                  paddingX: 4,
                  borderRadius: 50,
                  textTransform: "capitalize",
                  fontSize: 16,
                  "&:hover": { background: "#42545C" },
                }}
                onClick={handleNext}
                // disabled={activeStep === maxSteps - 1}
                disabled={!isOptionSelected || activeStep === maxSteps - 1}
              >
                Próximo
              </Button>
            )}

            <Button
              sx={{
                color: "#42545C",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Pular
            </Button>
          </Stack>
        }
      />
    </MainContainer>
  );
}
