// app/qr/[eventCode]/[checkCode]/page.tsx

'use client'
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Box, Text, Image, VStack } from '@chakra-ui/react';

interface QRCodePageProps {
  params: {
    eventCode: string;
    checkCode: string;
  };
}

const QRCodePage = ({ params }: QRCodePageProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [checkName, setCheckName] = useState<string | null>(null); // check 이름 상태
  const { eventCode, checkCode } = params;
  
  // QR 코드 생성
  useEffect(() => {
    const generateQRCode = async () => {
      try {/*${window.location.origin}*/
        const targetUrl = `http://172.25.10.10:3000/check/${eventCode}/${checkCode}/`;
        const url = await QRCode.toDataURL(targetUrl);
        setQrCodeUrl(url);
      } catch (error) {
        console.error('Failed to generate QR code:', error);
      }
    };
    
    generateQRCode();
  }, [eventCode, checkCode]);
  
  // check 이름을 가져오는 함수
  useEffect(() => {
    const fetchCheckName = async () => {
      try {
        const response = await fetch(`/api/event/${eventCode}/checks/${checkCode}`);
        if (response.ok) {
          const data = await response.json();
          setCheckName(data.name);
        } else {
          setCheckName(null);
        }
      } catch (error) {
        console.error('Failed to fetch check name:', error);
        setCheckName(null);
      }
    };
    
    fetchCheckName();
  }, [eventCode, checkCode]);
  
  // QR 코드 및 check 정보 UI 렌더링
  return (
    <Box p={5} textAlign="center">
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          QR Code for Event and Check
        </Text>
        {checkName ? (
          <>
            <Text>Check Name: {checkName}</Text>
            <Text>Scan this QR code to navigate to the check page</Text>
            {qrCodeUrl && <Image src={qrCodeUrl} alt="QR Code" width={200} height={200} />}
            <Text>{`/check/${eventCode}/${checkCode}`}</Text>
          </>
        ) : (
          <Text color="red.500">Check not found</Text>
        )}
      </VStack>
    </Box>
  );
};

export default QRCodePage;
