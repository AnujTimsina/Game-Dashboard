import { Box, Grid, HStack, Text, VStack } from '@chakra-ui/react';
import { useGetStats } from 'src/api/transactions';
import { MoneyIcon, PersonIcon } from 'src/assets/images';

// border-radius: 10px;
// border-top: 1px solid rgba(255, 255, 255, 0.15);
// border-left: 1px solid rgba(255, 255, 255, 0.15);
// background: #1D2331;
// box-shadow: ;
export default function Dashboard() {
  const { data } = useGetStats();
  console.log(data);

  const consoleCards: ConsoleCardsProps[] = [
    {
      icon: <PersonIcon />,
      mainContent: (data as any)?.totalSubUsers,
      subContent: 'Total number of players registered',
    },
    // {
    //   icon: <PersonIcon />,
    //   mainContent: '0',
    //   subContent: 'Number of people recharged yesterday',
    // },
    // {
    //   icon: <PersonIcon />,
    //   mainContent: '0',
    //   subContent: 'Number of withdrawal yesterday',
    // },
    // {
    //   icon: <PersonIcon />,
    //   mainContent: '0',
    //   subContent: 'Active Population',
    // },
    // {
    //   icon: <PersonIcon />,
    //   mainContent: '0',
    //   subContent: 'Number of new registrations yesterday',
    // },
    // {
    //   icon: <PersonIcon />,
    //   mainContent: '0',
    //   subContent: 'Recharge amount yesterday',
    // },

    // {
    //   icon: <MoneyIcon />,
    //   mainContent: '0',
    //   subContent: 'Amount withdrawn yesterday',
    // },
    {
      icon: <MoneyIcon />,
      mainContent: (data as any)?.rechargeAmount - (data as any)?.redeemAmount,
      subContent: 'Total Income',
    },
    {
      icon: <MoneyIcon />,
      mainContent: (data as any)?.rechargeAmount,
      subContent: 'Accumulated recharge amount',
    },
    {
      icon: <MoneyIcon />,
      mainContent: (data as any)?.redeemAmount,
      subContent: 'Accumulated withdrawal amount',
    },
  ];

  return (
    <Grid
      bg={'cardBg'}
      p={{ base: '10px 25px', md: '16px 37px', lg: '24px 45px' }}
      borderRadius={'10px'}
      boxShadow={'0px 2px 2px 0px rgba(0, 0, 0, 0.25)'}
      gap={{ base: '20px', lg: '45px' }}
      justifyItems={'center'}
      templateColumns={{
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
    >
      {consoleCards.map((item, id) => (
        <ConsoleCards
          icon={item.icon}
          mainContent={item.mainContent}
          subContent={item.subContent}
          key={id}
        />
      ))}
    </Grid>
  );
}
interface ConsoleCardsProps {
  mainContent: string;
  subContent: string;
  icon: JSX.Element;
}

function ConsoleCards({ icon, mainContent, subContent }: ConsoleCardsProps) {
  return (
    <HStack
      p={'24px'}
      borderRadius={'10px'}
      boxShadow={'0px 2px 2px 0px rgba(0, 0, 0, 0.25)'}
      bg={'searchBg'}
      maxW={'250px'}
      gap={'25px'}
    >
      <Box>{icon}</Box>
      <VStack align={'flex-start'}>
        <Text variant={'cardMainContent'}>{mainContent}</Text>
        <Text variant={'cardSubContent'}>{subContent}</Text>
      </VStack>
    </HStack>
  );
}
