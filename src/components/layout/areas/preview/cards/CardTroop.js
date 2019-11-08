import React, { useEffect, useRef } from "react";
import { Layer } from "react-konva";
import {
  CardBase,
  CardImage,
  CardText,
  CardTextRef,
  CardImageRotating
} from "./CardBase";
import { rarities } from "../../../../Values";

const getImageURL = troop => {
  if (troop.troopimage !== null) {
    return URL.createObjectURL(troop.troopimage);
  }
  // Else, use the default.
  return `./assets/graphics/troop/infernus.png`;
};

// Render a spell as part of a full-size card (like in the troop list).
const CardTroop = ({ troop, displayLayer, fontsLoaded }) => {
  const loadingLayer = useRef(null);

  useEffect(() => {
    // Hide while loading.
    displayLayer.current.loaded = false;
    loadingLayer.current.show();
    displayLayer.current.hide();
    loadingLayer.current.draw();
  }, []);

  // Show once loaded.
  useEffect(() => {
    if (fontsLoaded && displayLayer.current.loaded) {
      loadingLayer.current.hide();
      displayLayer.current.show();
      displayLayer.current.draw();
    }
  }, [fontsLoaded, (displayLayer.current || { loaded: false }).loaded]);

  const typeRef = useRef(null);

  const typeText =
    troop.type2 !== "" ? `${troop.type1} / ${troop.type2}` : troop.type1;

  return (
    <CardBase width={490} height={739}>
      <Layer ref={loadingLayer}>
        <CardImageRotating
          src="./assets/graphics/troop/loading.png"
          x={195}
          y={323}
          width={100}
          height={100}
          angularRate={90}
        />
      </Layer>
      <Layer ref={displayLayer}>
        <CardImage
          src={getImageURL(troop)}
          x={30}
          y={37 + 9}
          width={461}
          height={643}
          crop={{ x: 0, y: 9, width: 460, height: 643 }}
        />

        <CardImage
          src={
            troop.rarity !== ""
              ? `./assets/graphics/troopcard/${troop.rarity}.png`
              : null
          }
          width={490}
          height={739}
          onLoad={() => {
            displayLayer.current.loaded = true;
          }}
        />

        <CardImage
          src={
            troop.rarity !== ""
              ? `./assets/graphics/colors/${troop.colors}.png`
              : null
          }
          width={100}
          height={100}
          x={0}
          y={0}
        />
        <CardText
          text={troop.cost}
          x={15}
          y={25}
          width={70}
          fontSize={60}
          fontWeight={600}
          shadowColor="black"
          horizontalAlign="center"
          shadowOffset={2}
          fontsLoaded={fontsLoaded}
        />

        <CardText
          text={troop.level}
          x={0}
          y={96}
          width={475}
          horizontalAlign="right"
          fontSize={50}
          fontWeight={600}
          fontsLoaded={fontsLoaded}
        />

        <CardImage
          src={
            troop.trait1code !== ""
              ? `./assets/graphics/traiticons/${troop.trait1code}.png`
              : null
          }
          x={45}
          y={243}
          color={rarities.Epic.color}
          width={50}
          height={50}
        />
        <CardImage
          src={
            troop.trait2code !== ""
              ? `./assets/graphics/traiticons/${troop.trait2code}.png`
              : null
          }
          x={45}
          y={308}
          color={rarities.Legendary.color}
          width={50}
          height={50}
        />
        <CardImage
          src={
            troop.trait3code !== ""
              ? `./assets/graphics/traiticons/${troop.trait3code}.png`
              : null
          }
          x={45}
          y={373}
          color={rarities.Mythic.color}
          width={50}
          height={50}
        />

        <CardText
          text={troop.name}
          x={45}
          y={285}
          width={380}
          height={300}
          fontFamily="Raleway"
          horizontalAlign="left"
          verticalAlign="bottom"
          fontSize={57}
          fontWeight={500}
          fontsLoaded={fontsLoaded}
        />
        <CardText
          text={troop.kingdom}
          x={45}
          y={585}
          width={460}
          horizontalAlign="left"
          color="#CCCCCC"
          fontSize={30}
          fontWeight={600}
          fontsLoaded={fontsLoaded}
        />

        <CardText
          text={troop.attack}
          x={110}
          y={635}
          width={460}
          horizontalAlign="left"
          fontSize={45}
          fontWeight={600}
          fontsLoaded={fontsLoaded}
        />
        <CardText
          text={troop.armor}
          x={250}
          y={635}
          width={460}
          horizontalAlign="left"
          fontSize={45}
          fontWeight={600}
          fontsLoaded={fontsLoaded}
        />
        <CardText
          text={troop.life}
          x={400}
          y={635}
          width={460}
          horizontalAlign="left"
          fontSize={45}
          fontWeight={600}
          fontsLoaded={fontsLoaded}
        />

        <CardImage
          src={
            troop.rarity !== ""
              ? `./assets/graphics/roles/${troop.role}.png`
              : null
          }
          x={
            260 - 44 - 16 - (typeRef.current || { textWidth: 0 }).textWidth / 2
          }
          y={692}
          color="#000000"
          width={44}
          height={44}
        />
        <CardTextRef
          ref={typeRef}
          text={typeText}
          x={40}
          y={700}
          horizontalAlign="center"
          width={440}
          color="#000000"
          fontSize={30}
          fontWeight={600}
          fontsLoaded={fontsLoaded}
        />
        <CardImage
          src={
            troop.rarity !== ""
              ? `./assets/graphics/roles/${troop.role}.png`
              : null
          }
          x={260 + 16 + (typeRef.current || { textWidth: 0 }).textWidth / 2}
          y={692}
          color="#000000"
          width={44}
          height={44}
        />
      </Layer>
    </CardBase>
  );
};

export default CardTroop;
