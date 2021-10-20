module.exports = {
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
        new Date(date).getFullYear()
      }`;
    },
  //   ownedComment: (commentIdArr) => {
  //     console.log(commentIdArr.length);
  //     for (let i = 0; i < 1; i++){
  //     if (commentIdArr[i] === req.session.user_id){
  //         commentIdArr.shift();
  //         return true
  //     } else{
  //         commentIdArr.shift();
  //         return false
  //     }
  // }
// },
  };
  