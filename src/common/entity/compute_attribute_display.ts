import { HassEntity } from "home-assistant-js-websocket";
import { EntityRegistryDisplayEntry } from "../../data/entity_registry";
import { HomeAssistant } from "../../types";
import { LocalizeFunc } from "../translations/localize";
import { computeDomain } from "./compute_domain";

export const computeAttributeValueDisplay = (
  localize: LocalizeFunc,
  stateObj: HassEntity,
  entities: HomeAssistant["entities"],
  attribute: string,
  value?: any
): string => {
  const entityId = stateObj.entity_id;
  const deviceClass = stateObj.attributes.device_class;
  const attributeValue =
    value !== undefined ? value : stateObj.attributes[attribute];
  const domain = computeDomain(entityId);
  const entity = entities[entityId] as EntityRegistryDisplayEntry | undefined;
  const translationKey = entity?.translation_key;

  return (
    (translationKey &&
      localize(
        `component.${entity.platform}.entity.${domain}.${translationKey}.state_attributes.${attribute}.state.${attributeValue}`
      )) ||
    (deviceClass &&
      localize(
        `component.${domain}.entity_component.${deviceClass}.state_attributes.${attribute}.state.${attributeValue}`
      )) ||
    localize(
      `component.${domain}.entity_component._.state_attributes.${attribute}.state.${attributeValue}`
    ) ||
    attributeValue
  );
};

export const computeAttributeNameDisplay = (
  localize: LocalizeFunc,
  stateObj: HassEntity,
  entities: HomeAssistant["entities"],
  attribute: string
): string => {
  const entityId = stateObj.entity_id;
  const deviceClass = stateObj.attributes.device_class;
  const domain = computeDomain(entityId);
  const entity = entities[entityId] as EntityRegistryDisplayEntry | undefined;
  const translationKey = entity?.translation_key;

  return (
    (translationKey &&
      localize(
        `component.${entity.platform}.entity.${domain}.${translationKey}.state_attributes.${attribute}.name`
      )) ||
    (deviceClass &&
      localize(
        `component.${domain}.entity_component.${deviceClass}.state_attributes.${attribute}.name`
      )) ||
    localize(
      `component.${domain}.entity_component._.state_attributes.${attribute}.name`
    ) ||
    attribute
  );
};
