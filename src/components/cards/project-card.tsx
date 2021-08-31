import Icon from '@mdi/react';
import Image from 'next/image';
import Link from 'next/link';
// import { usePalette } from 'react-palette';

import { BaseProjectCard } from './base-project-card';

import { Component, ComponentProps } from '~/elements/fc';
// import { BlogPostProps } from '~/types/blog-post';
import { ProjectProps } from '~/types/project';
import { SkillProps, skills } from '~/types/skill';
import buildShadowColors from '~/utils/build-shadow-colors';
// import formatDate from '~/utils/format-date';
// import getColorFromPalette from '~/utils/get-color-from-palette';

interface ProjectCardProps extends ComponentProps, ProjectProps {}

const getSkill = (skillName: string): SkillProps | null => {
  try {
    return skills.filter(
      (it: SkillProps) => it.name.toLowerCase() === skillName.toLowerCase(),
    )[0];
  } catch (e) {
    return null;
  }
};

const iconSize = 0.8;
export const ProjectCard: Component<ProjectCardProps> = (props) => {
  const {
    title,
    description,
    link,
    icon,
    preview,
    stack,
    color,
    // darkColor,
    // gradient,
    // darkGradient,
  } = props;
  // TODO

  const renderProjectStack = () => {
    if (!stack || !stack.length) return null;
    return (
      <ul className={'stack'}>
        {stack.map((skillName: string, i: number) => {
          const skill = getSkill(skillName);
          if (!skill) return null;
          return (
            <li
              key={i}
              className={
                skillName.toLowerCase().includes('kotlin') ? 'no-mr' : ''
              }
            >
              <Icon
                path={skill.iconPath}
                color={skill.color}
                size={skillName === 'android' ? iconSize * 1.25 : iconSize}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Link href={link} passHref={true}>
      <BaseProjectCard
        to={link}
        className={'nodeco'}
        style={{
          ...buildShadowColors(color),
        }}
      >
        {preview?.length && (
          <div className={'preview'}>
            <Image
              src={preview}
              alt={title}
              width={341}
              height={256}
              layout={'fixed'}
              loading={'lazy'}
            />
          </div>
        )}
        <div className={'wrapper'}>
          <div className={'content'}>
            <div className={'icon-title'}>
              <Image
                src={icon}
                alt={title}
                width={48}
                height={48}
                layout={'fixed'}
                loading={'lazy'}
              />
              <h5>{title}</h5>
            </div>
            <p>{description}</p>
            {renderProjectStack()}
          </div>
        </div>
      </BaseProjectCard>
    </Link>
  );
};