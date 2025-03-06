import Image from 'next/image';
import { Avatar, Card, Flex, Link, Text } from '@radix-ui/themes';

interface Props {
  title: string;
  description: string;
  image: string;
  backgroundImage: string;
  link: string;
}

const ProjectCard = ({
  title,
  description,
  image,
  backgroundImage,
  link,
}: Props) => {
  return (
    <Card
      className="rounded-lg border shadow-sm group overflow-hidden"
      variant="classic"
      style={{ padding: '0' }}
    >
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        <Image
          className="inset-0 absolute object-cover "
          src={backgroundImage}
          alt={title}
          width={600}
          height={400}
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        <Flex
          gap="3"
          align="center"
          className="p-6 bg-blue-950/80 backdrop-blur-xs group-hover:opacity-0 transition-opacity"
        >
          <Flex direction="column" gap="3">
            <Flex direction="row" align="center" gap="3">
              <Avatar size="3" src={image} fallback="X" />
              <Text size="3" weight="bold" color="yellow">
                {title}
              </Text>
            </Flex>
            <Text size="2" color="gold">
              {description}
            </Text>
          </Flex>
        </Flex>
      </Link>
    </Card>
  );
};

export default ProjectCard;
