/**
 * Created by tanker on 17/10/11.
 */
import request from './../utils/request'

export async function getUser() {
  return request('/user',{
    method:'GET'
  })
}
