// import * as Yup from 'yup';

export interface userInfo {
  email: string;
  password: string;
  birthday: string;
  weight: number;
  height: number;
  gender: string;
}
export interface form1Data {
  email: string;
}

export interface form2Data {
  birthday: string;
  weight: number;
  height: number;
  gender: string;
}

export interface form3Data {
  password: string;
}

// // 선언형 유효성 검사
// export const validationSchema = Yup.object().shape({
//   email: Yup.string()
//     .email('유효하지 않은 이메일 형식입니다.')
//     .test(
//       'len',
//       '유효한 이메일을 입력해 주세요.',
//       (val: any) =>
//         val &&
//         /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/.test(
//           val
//         )
//     )
//     .required('이메일을 입력해 주세요.'),

//   password: Yup.string()
//     .test(
//       'len',
//       '6 ~ 16글자의 영문자, 숫자, 특수문자의 조합으로 입력해 주세요.',
//       (val: any) =>
//         val &&
//         /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,16}$/.test(
//           val
//         )
//     )
//     .required('비밀번호를 입력해 주세요'),
//   checkPassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
//     .required('비밀번호를 다시 입력해 주세요'),
//   weight: Yup.number()
//     .test(
//       '몸무게',
//       '소수점 이하 2자리까지의 숫자를 입력할 수 있습니다.',
//       (val: any) => val && (val + '').match(/^\d(\.\d{0, 2})?$/)
//     )
//     .required('몸무게를 입력해 주세요.'),
// });
